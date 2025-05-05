import { v4 as uuidv4 } from 'uuid';

interface SystemStorage {
  state: {
    notificationPermission: string;
    currentLocation: null;
    fcmToken: string;
    geolocationPermission: string;
    version: number;
  };
}

const SYSTEM_STORAGE_KEY = 'system-storage';

export function getUserDeviceId(): string {
  const key = 'DEVICE_ID';
  let deviceId = localStorage.getItem(key);

  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem(key, deviceId);
  }

  return deviceId;
}

export function getSystemStorage(): SystemStorage | null {
  const storage = localStorage.getItem(SYSTEM_STORAGE_KEY);
  return storage ? JSON.parse(storage) : null;
}

interface AlarmSettings {
  isAlarmEnabled: boolean;
  hours: string;
  minutes: string;
  selectedSchedule: string;
}

const ALARM_SETTINGS_KEY = 'ALARM_SETTINGS';

export function getAlarmSettings(): AlarmSettings {
  const systemStorage = getSystemStorage();
  const defaultSettings: AlarmSettings = {
    isAlarmEnabled: systemStorage?.state.notificationPermission === 'granted',
    hours: '23',
    minutes: '59',
    selectedSchedule: 'daily',
  };

  const storedSettings = localStorage.getItem(ALARM_SETTINGS_KEY);
  return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
}

export function saveAlarmSettings(settings: AlarmSettings): void {
  localStorage.setItem(ALARM_SETTINGS_KEY, JSON.stringify(settings));
}

export function updateSystemStorageNotificationPermission(isEnabled: boolean): void {
  const systemStorage = getSystemStorage();
  if (systemStorage) {
    systemStorage.state.notificationPermission = isEnabled ? 'granted' : 'denied';
    localStorage.setItem(SYSTEM_STORAGE_KEY, JSON.stringify(systemStorage));
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const permission = await Notification.requestPermission();
    const isGranted = permission === 'granted';

    // Update system storage
    const systemStorage = getSystemStorage();
    if (systemStorage) {
      systemStorage.state.notificationPermission = permission;
      localStorage.setItem(SYSTEM_STORAGE_KEY, JSON.stringify(systemStorage));
    }

    return isGranted;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

export function checkNotificationPermission(): boolean {
  return Notification.permission === 'granted';
}
