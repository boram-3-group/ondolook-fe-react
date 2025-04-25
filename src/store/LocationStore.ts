import { create } from 'zustand';
import { LocationResponse } from '../pages/HomePage/type';

type locationStore = LocationResponse & {
  setLocation: (lat: number, lon: number) => void;
};

const LocationStore = create<locationStore>(set => ({
  lat: 0,
  lon: 0,
  setLocation: (latitude, longitude) => set({ lat: latitude, lon: longitude }),
}));

export default LocationStore;
