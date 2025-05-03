import React, { useRef, useState, useEffect } from 'react';

type CarouselProps = {
  slides: React.ReactNode[];
  height?: number; // 선택 사항
  dotType?: 'default' | 'long';
};

const Carousel: React.FC<CarouselProps> = ({ slides, height }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [current, setCurrent] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

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
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full"
      style={height ? { height } : {}}
    >
      <div
        className="flex"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${dragOffset - current * containerWidth}px)`,
          transition: dragStartX ? 'none' : 'transform 0.3s ease',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              width: containerWidth,
              flexShrink: 0,
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center items-center bottom-2 gap-2 mt-5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === current ? 'bg-[#1E90FF]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
