import { useEffect, useState } from 'react';

type AppSplashProps = {
  duration?: number; // splash 유지 시간
  fadeDuration?: number; // 페이드아웃 시간
};

export function AppSplash({ duration = 2000, fadeDuration = 700 }: AppSplashProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // 세션 스토리지를 사용하여 현재 탭에서만 스플래시 표시 여부 확인
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

    if (!hasSeenSplash) {
      setHidden(false);
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setHidden(true);
          sessionStorage.setItem('hasSeenSplash', 'true');
        }, fadeDuration);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, fadeDuration]);

  return (
    <>
      {!hidden && (
        <div
          className={`absolute inset-0 z-[9999] flex items-center justify-center bg-white pointer-events-none transition-opacity ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ transitionDuration: `${fadeDuration}ms` }}
        >
          <img src="/splash-icon.png" alt="splash" />
        </div>
      )}
    </>
  );
}
