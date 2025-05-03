import { create } from 'zustand';
import { LocationResponse } from '../pages/HomePage/type';

type LocationStore = LocationResponse & {
  setLocation: (lat: number, lon: number) => void;
};

export const useLocationStore = create<LocationStore>(set => ({
  lat: 0,
  lon: 0,
  setLocation: (latitude, longitude) => set({ lat: latitude, lon: longitude }),
}));
