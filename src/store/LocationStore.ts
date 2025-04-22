import { create } from 'zustand';
import { LocationResponse } from '../pages/HomePage/type';

type locationStore = LocationResponse & {
  setLocation: (lat: number, lon: number) => void;
  setLatitude: (lat: number) => void;
  setLongitude: (lon: number) => void;
};

const LocationStore = create<locationStore>(set => ({
  lat: 0,
  lon: 0,

  //useGeolocation에서 position.coords.latitude(latitude) 받아 store에 있는 lat을 업데이트함
  setLatitude: latitude => set({ lat: latitude }),
  setLongitude: longitude => set({ lon: longitude }),
  setLocation: (latitude, longitude) => set({ lat: latitude, lon: longitude }),
}));

export default LocationStore;
