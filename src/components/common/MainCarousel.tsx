import React, { useRef, useState, useEffect } from 'react';
import { Icon } from './Icon';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Modal } from './Modal';
import { useModalStore } from '../../store/useModalStore';
import { trackViewCoordi } from '../../utils/analytics';

type MainCarouselProps = {
  slides: React.ReactNode[];
  temp: number | undefined;
  type: string;
};
const MainCarousel = ({ slides, temp, type }: MainCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [current, setCurrent] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const pushModal = useModalStore(state => state.pushModal);
  const popModal = useModalStore(state => state.popModal);
  const currentModal = useModalStore(state => state.currentModal);

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
    const userId = JSON.parse(localStorage.getItem('user-storage') || '{}')?.state?.user?.id;
    trackViewCoordi({
      userId,
      type: type,
      temp: temp,
    });
    if (clamped > current && !isAuth()) {
      pushModal({
        type: 'carousel',
        onMove: () => {
          popModal();
          navigate('/login');
        },
        closeModal: popModal,
      });
      return;
    }
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
              height: '100%',
              width: containerWidth * 0.9,
              marginRight: 10,
              flexShrink: 0,
            }}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="flex justify-between h-[52px] ">
        <Icon name="home-selected" width={48} height={48} className="ml-9" alt="홈" />
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
          onClick={() => {
            if (!isAuth()) {
              pushModal({
                type: 'mypage',
                onMove: () => {
                  popModal();
                  navigate('/login');
                },
                closeModal: popModal,
              });
            } else {
              navigate('/my');
            }
          }}
          name="mypage"
          width={48}
          height={48}
          className="mr-9 cursor-pointer"
          alt="마이페이지"
        />
      </div>
      {currentModal && (
        <Modal
          closeModal={currentModal.closeModal}
          onMove={currentModal.onMove}
          title={currentModal.title}
          message={currentModal.message}
          firstText={currentModal.firstText}
          secondText={currentModal.secondText}
          type={currentModal.type}
        />
      )}
    </div>
  );
};

export default MainCarousel;
