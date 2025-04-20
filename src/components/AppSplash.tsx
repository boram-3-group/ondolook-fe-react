import { useEffect, useState } from 'react';

type AppSplashProps = {
  duration?: number; // splash 유지 시간
  fadeDuration?: number; // 페이드아웃 시간
  children: React.ReactNode;
};

export function AppSplash({ duration = 2000, fadeDuration = 700, children }: AppSplashProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false); // splash 제거 여부

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // 페이드아웃 시작
      setTimeout(() => {
        setHidden(true); // 완전 제거
      }, fadeDuration);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, fadeDuration]);

  return (
    <>
      <div className="relative w-full h-full">
        {children}
        {!hidden && (
          <div
            className={`absolute inset-0 z-[9999] flex items-center justify-center bg-white pointer-events-none transition-opacity  ${
              fadeOut ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ transitionDuration: `${fadeDuration}ms` }}
          >
            <img src="/splash-icon.png" alt="splash" />
          </div>
        )}
      </div>
    </>
  );
}
