import { useEffect } from 'react';
import useLocationStore from '../store/useLocationStore';

export const useGeolocation = () => {
  const lat = useLocationStore(state => state.lat);
  const lon = useLocationStore(state => state.lon);
  const setLocation = useLocationStore(state => state.setLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [lat, lon]);
};
