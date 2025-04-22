import { useEffect } from 'react';
import LocationStore from '../store/LocationStore';

export const useGeolocation = () => {
  const lat = LocationStore(state => state.lat);
  const lon = LocationStore(state => state.lon);
  const setLatitude = LocationStore(state => state.setLatitude);
  const setLongitude = LocationStore(state => state.setLongitude);
  const setLocation = LocationStore(state => state.setLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocation(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [setLatitude, setLongitude, setLocation]);
};
