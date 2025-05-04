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
  }, [weather]);

  console.log('backgroundImage', backgroundImage);

  return (
    <div
      className="w-full h-full fixed inset-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <Outlet />
    </div>
  );
}
