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
import { useAddBookmarkById, useDeleteBookmarkById } from '../MyPage/fetches/useFetchBookmark';
import { Modal } from '../../components/common/Modal';
import { useModalStore } from '../../store/useModalStore';
import { trackSelectSchedule } from '../../utils/analytics';

export function HomePage() {
  const [selectCategory, setSelectCategory] = useState('데일리');
  const navigate = useNavigate();
  const onSelectChip = useCallback((Category: string) => {
    setSelectCategory(Category);
    const userId = JSON.parse(localStorage.getItem('user-storage') || '{}')?.state?.user?.id;
    if (userId) {
      trackSelectSchedule({
        userId,
        type: Category,
      });
    }
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

  const pushModal = useModalStore(state => state.pushModal);
  const popModal = useModalStore(state => state.popModal);
  const currentModal = useModalStore(state => state.currentModal);

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
    eventType: selectCategoryId || 2,
    gender: Usergender || 'FEMALE',
  });

  const fileMetadata = OutfitData?.fileMetadata;

  const { mutate: deleteBookmarkById } = useDeleteBookmarkById({
    lat,
    lon,
    eventType: selectCategoryId || 2,
    gender: Usergender || 'FEMALE',
  });
  const { mutate: addBookmarkById } = useAddBookmarkById({
    lat,
    lon,
    eventType: selectCategoryId || 2,
    gender: Usergender || 'FEMALE',
  });

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
    <div className="flex flex-col h-full">
      <div className="flex mb-[20px] justify-between px-4 h-[44px] items-center">
        {RegionData && <RegionTab {...RegionData} />}
        <Icon
          name="bell"
          width={24}
          height={24}
          alt="알람"
          onClick={() => {
            if (!isAuth()) {
              pushModal({
                type: 'alarm',
                onMove: () => {
                  popModal();
                  navigate('/login');
                },
                closeModal: popModal,
              });
            } else {
              navigate('/my/alarm');
            }
          }}
        />
      </div>
      <div className="mx-5">
        <div className="mb-[20px]" onClick={() => navigate('/weather')}>
          {WeatherData && currentForecast && maxTodayTemp && minTodayTemp && (
            <WeatherBox
              forecast={currentForecast}
              weatherMessage={WeatherData.weatherMessage}
              maxTodayTemp={maxTodayTemp}
              minTodayTemp={minTodayTemp}
            />
          )}
        </div>
        <div className="flex w-full justify-between mb-5 gap-[14px]">
          {Categories?.content?.map((Category, index) => (
            <CategoryChip
              key={Category.id}
              categoryName={Category.categoryName}
              onClick={() => {
                if (!isAuth()) {
                  pushModal({
                    type: 'category',
                    onMove: () => {
                      popModal();
                      navigate('/login');
                    },
                    closeModal: popModal,
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
          temp={currentForecast?.temperature}
          type={selectCategory}
          slides={fileMetadata.map(item => (
            <div key={item.id} className="relative">
              <img
                loading="lazy"
                src={item.metadata.presignedUrl}
                alt={item.metadata.presignedUrl}
                className="w-full px-5 h-full object-contain bg-white/70 rounded-[20px]"
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
                    pushModal({
                      type: 'bookmark',
                      onMove: () => {
                        popModal();
                        navigate('/login');
                      },
                      closeModal: popModal,
                    });
                  } else {
                    handleToggleBookmark({
                      outfitImageId: String(item.id),
                      isIdBookmark: item.bookmarked,
                    });
                  }
                }}
              />
            </div>
          ))}
        />
      )}
      {currentModal && (
        <Modal
          closeModal={currentModal.closeModal}
          onMove={currentModal.onMove}
          title={currentModal.title}
          message={currentModal.message}
          firstText={currentModal.firstText}
          secondText={currentModal.secondText}
          type={currentModal.type}
        />
      )}
    </div>
  );
}
