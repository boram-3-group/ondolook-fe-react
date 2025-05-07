import { useState, useCallback, useEffect } from 'react';
import CategoryChip from './_components/CategoryChip';
import { RegionTab } from './_components/RegionTab';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useFetchOutfit } from './fetches/useFetchOutfit';
import { useFetchCategory } from './fetches/useFetchCategory';
import { WeatherBox } from './_components/WeatherBox';
import { Icon } from '../../components/common/Icon';
import { useLocationStore } from '../../store/useLocationStore';
import { useFetchRegion } from './fetches/useFetchRegion';
import { useFetchWeather } from './fetches/useFetchWeather';
import useWeatherStore from '../../store/useWeatherStore';
import MainCarousel from '../../components/common/MainCarousel';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAddBookmark, useDeleteBookmark } from '../MyPage/fetches/useFetchBookmark';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../components/common/Modal';

export function HomePage() {
  const [selectCategory, setSelectCategory] = useState('비즈니스');
  const navigate = useNavigate();
  const onSelectChip = useCallback((Category: string) => {
    setSelectCategory(Category);
  }, []);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited && !hasSeenSplash) {
      setTimeout(() => {
        toast.success('온도룩에 오신 것을 환영합니다! 🎉');
        sessionStorage.setItem('hasVisited', 'true');
      }, 2000);
    } else if (!hasVisited) {
      toast.success('온도룩에 오신 것을 환영합니다! 🎉');
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const { isOpen, openModal, closeModal, content } = useModal();

  useGeolocation();
  const { lat, lon } = useLocationStore();

  const { isAuth } = useAuth();
  const setWeather = useWeatherStore(state => state.setWeather);

  const shouldFetch = lat !== 0 && lon !== 0;

  const { data: Categories, isLoading: CategoriesLoading } = useFetchCategory();
  const selectCategoryData = Categories?.content.find(
    Category => Category.categoryName === selectCategory
  );
  const selectCategoryId = selectCategoryData?.id;

  const { data: RegionData, isLoading: RegionDataLoading } = useFetchRegion(
    { lat, lon },
    {
      enabled: shouldFetch,
    }
  );

  const { data: WeatherData, isLoading: WeatherDataLoading } = useFetchWeather({
    lat,
    lon,
  });

  // 현재 시간
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const hoursString = String(currentHours).padStart(2, '0');

  // 현재 시간에 해당하는 forecast
  const currentForecast = WeatherData?.forecasts.find(
    forecast => forecast.time.substring(0, 2) === hoursString
  );

  // 오늘 최저/최고 온도
  const TodayTemp = WeatherData?.forecasts.map(forecast => forecast.temperature);
  const maxTodayTemp = TodayTemp && Math.max(...TodayTemp);
  const minTodayTemp = TodayTemp && Math.min(...TodayTemp);

  const Usergender = JSON.parse(localStorage.getItem('user-storage') || '{}')?.state?.user?.gender;

  useEffect(() => {
    if (currentForecast) {
      setWeather(currentForecast.iconMessage);
    }
  }, [currentForecast, setWeather]);

  const { data: OutfitData, isLoading: OutfitDataLoading } = useFetchOutfit({
    lat,
    lon,
    eventType: selectCategoryId || 1,
    gender: Usergender || 'FEMALE',
  });

  const fileMetadata = OutfitData?.fileMetadata;

  const { deleteBookmarkById } = useDeleteBookmark();
  const { mutate: addBookmarkById } = useAddBookmark();

  const handleToggleBookmark = ({
    outfitImageId,
    isIdBookmark,
  }: {
    outfitImageId: string;
    isIdBookmark: boolean;
  }) => {
    if (!isIdBookmark) {
      addBookmarkById(outfitImageId);
    } else {
      deleteBookmarkById(outfitImageId);
    }
  };

  return (
    <div className="flex flex-col h-full ">
      <div className="flex mb-[20px] justify-between px-4 h-[44px] items-center">
        {RegionData && <RegionTab {...RegionData} />}
        <Icon
          name="bell"
          width={24}
          height={24}
          alt="알람"
          onClick={() => {
            if (!isAuth()) {
              openModal({
                title: '놓치지 않게 미리 알려드려요!',
                message: '알림 설정은 로그인 후에 가능해요',
              });
            } else {
              navigate('/my/alarm');
            }
          }}
        />
      </div>
      <div className="mx-5">
        <div className="mb-[20px]">
          {WeatherData && currentForecast && maxTodayTemp && minTodayTemp && (
            <WeatherBox
              forecast={currentForecast}
              weatherMessage={WeatherData.weatherMessage}
              maxTodayTemp={maxTodayTemp}
              minTodayTemp={minTodayTemp}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-[12px] mb-5">
          {Categories?.content?.map(Category => (
            <CategoryChip
              key={Category.id}
              categoryName={Category.categoryName}
              onClick={() => {
                if (!isAuth()) {
                  openModal({
                    title: '맞춤 일정 코디, 궁금하신가요?',
                    message: '내 일정에 맞는 코디를 보려면 로그인이 필요해요',
                  });
                } else {
                  onSelectChip(Category.categoryName);
                }
              }}
              isActive={selectCategory === Category.categoryName}
            />
          ))}
        </div>
      </div>
      {fileMetadata && (
        <MainCarousel
          slides={fileMetadata.map(item => (
            <div
              key={item.id}
              className="relative w-full h-full flex flex-col justify-center items-center bg-grayScale-30 rounded-lg"
            >
              <img
                loading="lazy"
                src={item.metadata.presignedUrl}
                alt={item.metadata.presignedUrl}
                className="w-full px-5 h-full object-contain bg-grayScale-10"
                draggable={false}
              />
              <Icon
                name={!item.bookmarked ? 'white-bookmark' : 'blue-bookmark'}
                width={48}
                height={48}
                alt="북마크"
                className="absolute top-4 right-4 z-10 cursor-pointer"
                onClick={() => {
                  if (!isAuth()) {
                    openModal({
                      title: '맘에 드는 코디, 나중에 또 보려면?',
                      message: '로그인하면 코디를 저장할 수 있어요!',
                    });
                  } else {
                    handleToggleBookmark({
                      outfitImageId: item.id,
                      isIdBookmark: item.bookmarked,
                    });
                  }
                }}
              />
            </div>
          ))}
        />
      )}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          onMove={() => {
            closeModal();
            navigate('/login');
          }}
          title={content.title}
          message={content.message}
        />
      )}
    </div>
  );
}
