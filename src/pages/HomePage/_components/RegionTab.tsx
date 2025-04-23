import { useGeolocation } from '../../../hooks/useGeolocation';
import LocationStore from '../../../store/LocationStore';
import { useFetchRegion } from '../fetches/useFetchRegion';

export const RegionTab = () => {
  useGeolocation();
  const { lat, lon } = LocationStore();

  const shouldFetch = lat !== 0 && lon !== 0;
  console.log('shouldfetch');
  const { data, isLoading } = useFetchRegion(
    { lat: 37.498095, lon: 127.02761 },
    { enabled: shouldFetch }
  );

  console.log('regiontab');
  return (
    <>
      <div>{JSON.stringify(isLoading)}</div>
      <div> {JSON.stringify(data)}</div>
    </>
  );
};
