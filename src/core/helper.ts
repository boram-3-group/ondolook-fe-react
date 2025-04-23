import { v4 as uuidv4 } from 'uuid';

export function getUserDeviceId(): string {
  const key = 'DEVICE_ID';
  let deviceId = localStorage.getItem(key);

  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem(key, deviceId);
  }

  return deviceId;
}
