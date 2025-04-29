import { Icon } from '../../../components/common/Icon';
import { useGeolocation } from '../../../hooks/useGeolocation';
import useLocationStore from '../../../store/useLocationStore';
import { useFetchRegion } from '../fetches/useFetchRegion';

export const RegionTab = () => {
  useGeolocation();
  const { lat, lon } = useLocationStore();

  const shouldFetch = lat !== 0 && lon !== 0;
  console.log('render!');
  const { data, isLoading } = useFetchRegion(
    { lat: 37.498095, lon: 127.02761 },
    { enabled: shouldFetch }
  );

  return (
    <>
      <div className="flex">
        {/* <div> {JSON.stringify(data)}</div> */}
        <Icon name="location" width={24} height={24} alt="위치" />
        <div className="text-Title1">서울시 강남구</div>
      </div>
    </>
  );
};
