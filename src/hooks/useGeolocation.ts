import { useEffect } from 'react';
import LocationStore from '../store/LocationStore';

export const useGeolocation = () => {
  const lat = LocationStore(state => state.lat);
  const lon = LocationStore(state => state.lon);
  const setLocation = LocationStore(state => state.setLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [lat, lon]);
};
