/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SystemState {
  isIOS: boolean;
  isAndroid: boolean;
  isPWA: boolean;
  isMobile: boolean;
  isPC: boolean;
  isSafari: boolean;
  notificationPermission: NotificationPermission;
  fcmToken: string | null;
  geolocationPermission: PermissionState;
  currentLocation: GeolocationCoordinates | null;

  setNotificationPermission: (permission: NotificationPermission) => void;
  setFcmToken: (token: string | null) => void;
  setGeolocationPermission: (permission: PermissionState) => void;
  setCurrentLocation: (location: GeolocationCoordinates | null) => void;
}

export const useSystem = create<SystemState>()(set => ({
  isMobile: /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
  isPC: !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
  isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
  isAndroid: !(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream),
  isPWA:
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true,
  isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
  notificationPermission: 'default',
  fcmToken: null,
  geolocationPermission: 'prompt',
  currentLocation: null,

  setNotificationPermission: permission => set({ notificationPermission: permission }),
  setFcmToken: token => set({ fcmToken: token }),
  setGeolocationPermission: permission => set({ geolocationPermission: permission }),
  setCurrentLocation: location => set({ currentLocation: location }),
}));
