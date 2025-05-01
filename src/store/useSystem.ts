import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isIOS } from '../core/constants';

interface SystemState {
  isPWAInstalled: boolean;
  setIsPWAInstalled: (installed: boolean) => void;

  notificationPermission: NotificationPermission;
  fcmToken: string | null;
  setNotificationPermission: (permission: NotificationPermission) => void;
  setFcmToken: (token: string | null) => void;

  geolocationPermission: PermissionState;
  currentLocation: GeolocationCoordinates | null;
  setGeolocationPermission: (permission: PermissionState) => void;
  setCurrentLocation: (location: GeolocationCoordinates | null) => void;

  isIOS: boolean;
  isAndroid: boolean;
}

export const useSystem = create<SystemState>()(
  persist(
    set => ({
      isPWAInstalled: false,
      setIsPWAInstalled: installed => set({ isPWAInstalled: installed }),

      notificationPermission: 'default',
      fcmToken: null,
      setNotificationPermission: permission => set({ notificationPermission: permission }),
      setFcmToken: token => set({ fcmToken: token }),

      geolocationPermission: 'prompt',
      currentLocation: null,
      setGeolocationPermission: permission => set({ geolocationPermission: permission }),
      setCurrentLocation: location => set({ currentLocation: location }),

      isIOS: isIOS,
      isAndroid: !isIOS,
    }),
    {
      name: 'system-storage',
      partialize: state => ({
        notificationPermission: state.notificationPermission,
        fcmToken: state.fcmToken,
        geolocationPermission: state.geolocationPermission,
        currentLocation: state.currentLocation,
      }),
    }
  )
);
