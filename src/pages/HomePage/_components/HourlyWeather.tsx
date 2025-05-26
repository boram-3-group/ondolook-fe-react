import { useEffect, useRef } from 'react';
import WeatherIcon from '../../../components/common/WeatherIcon';

type HourlyWeatherProps = {
  nowToWeather: {
    time: string;
    iconNumber: number;
    temperature: number;
  }[];
};

export const HourlyWeather = ({ nowToWeather }: HourlyWeatherProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  let isDragging = false;
  let startX = 0;
  let scrollLeftStart = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeftStart = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const move = e.pageX - startX;
    scrollRef.current.scrollLeft = scrollLeftStart - move;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollLeftStart = scrollRef.current?.scrollLeft || 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const move = e.touches[0].pageX - startX;
    scrollRef.current.scrollLeft = scrollLeftStart - move;
  };

  const handleTouchEnd = () => {
    isDragging = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="flex gap-[24px] px-[24px] py-[14px] overflow-x-auto no-scrollbar "
    >
      {nowToWeather.map((forecast, index) => (
        <div key={index} className="flex flex-col items-center flex-shrink-0">
          <div className="text-Body4 text-grayScale-60 mb-2">
            {index === 0
              ? '지금'
              : forecast.time.slice(0, 1) === '0'
                ? forecast.time.slice(1, 2) + '시'
                : forecast.time.slice(0, 2) + '시'}
          </div>
          <WeatherIcon weather={forecast.iconNumber.toString()} width={32} height={32} alt="맑음" />
          <div className="text-Body1 text-grayScale-60 mt-2">{forecast.temperature}°</div>
        </div>
      ))}
    </div>
  );
};
