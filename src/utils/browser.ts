export const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor;
  if (/KAKAOTALK/i.test(ua)) {
    return true;
  }
  if (/NAVER/i.test(ua) || /Line/i.test(ua) || /FBAN/i.test(ua) || /FBAV/i.test(ua)) {
    return true;
  }

  return false;
};
