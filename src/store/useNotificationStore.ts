import { create } from 'zustand';
import type { FirebaseMessage } from '../hooks/useFCM';

interface NotificationState {
  notification: FirebaseMessage | null;
  setNotification: (notification: FirebaseMessage) => void;
}

export const useNotificationStore = create<NotificationState>(set => ({
  notification: null,
  setNotification: notification => set({ notification }),
}));
