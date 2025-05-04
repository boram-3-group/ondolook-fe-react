import { Outlet } from 'react-router-dom';
import useWeatherStore from '../../store/useWeatherStore';
import { useEffect, useState } from 'react';

export function HomeLayout() {
  const weather = useWeatherStore(state => state.weather);

  const weatherBackgroundMap: Record<string, string> = {
    맑음: '/bg-sunny.svg',
    흐림: '/bg-cloudy.svg',
    비: '/bg-rainy.svg',
    눈: '/bg-sunny.svg',
  };

  const [backgroundImage, setBackgroundImage] = useState('/bg-sunny.svg');
  useEffect(() => {
    setBackgroundImage(weatherBackgroundMap[weather] || '/bg-sunny.svg');

    const $mobileContent = document.querySelector('.mobile-content');
    if ($mobileContent) {
      // ($mobileContent as HTMLElement).style.backgroundImage = `url(${backgroundImage})`;
      // ($mobileContent as HTMLElement).style.backgroundSize = 'cover';
      // ($mobileContent as HTMLElement).style.backgroundPosition = 'center';
      // ($mobileContent as HTMLElement).style.backgroundRepeat = 'no-repeat';
    }

    return () => {
      if ($mobileContent) {
        // ($mobileContent as HTMLElement).style.backgroundImage = '';
      }
    };
  }, [weather]);

  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}
