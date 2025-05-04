import React, { useRef, useState, useEffect } from 'react';
import { Icon } from './Icon';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type MainCarouselProps = {
  slides: React.ReactNode[];
};

const MainCarousel = ({ slides }: MainCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [current, setCurrent] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const navigate = useNavigate();
  const { isAuthCheck } = useAuth();

  const updateWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, slides.length - 1));
    setCurrent(clamped);
  };

  const handleMouseDown = (e: React.MouseEvent) => setDragStartX(e.clientX);
  const handleMouseMove = (e: MouseEvent) => {
    if (dragStartX !== null) setDragOffset(e.clientX - dragStartX);
  };
  const handleMouseUp = () => {
    if (dragOffset > 50) goTo(current - 1);
    else if (dragOffset < -50) goTo(current + 1);
    setDragStartX(null);
    setDragOffset(0);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });

  const handleTouchStart = (e: React.TouchEvent) => setDragStartX(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX !== null) setDragOffset(e.touches[0].clientX - dragStartX);
  };
  const handleTouchEnd = () => {
    if (dragOffset > 50) goTo(current - 1);
    else if (dragOffset < -50) goTo(current + 1);
    setDragStartX(null);
    setDragOffset(0);
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full flex flex-col h-full">
      <div
        className="flex flex-1 mb-8"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${dragOffset - current * (containerWidth * 0.9 + 10)}px)`,
          transition: dragStartX ? 'none' : 'transform 0.3s ease',
          paddingLeft: 20,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              // height: '100%',
              width: containerWidth * 0.9,
              marginRight: 10,
              flexShrink: 0,
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div className="h-[40px] flex justify-between">
        <Icon name="home" width={48} height={48} className="ml-9" alt="홈" />
        <div className="flex justify-center items-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-200 ${
                index === current
                  ? 'w-6 h-2 bg-primary-70 rounded-[94px]'
                  : 'rounded-full w-2.5 h-2.5 bg-white'
              }`}
            />
          ))}
        </div>
        <Icon
          onClick={() => isAuthCheck(() => navigate('/my'))}
          name="mypage"
          width={48}
          height={48}
          className="mr-9 cursor-pointer"
          alt="마이페이지"
        />
      </div>
    </div>
  );
};

export default MainCarousel;
