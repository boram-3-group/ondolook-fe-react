import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Carousel from '../../components/common/Carousel';

export const OnBoardPage = () => {
  const images = [
    '날씨에 맞는 코디를 추천해요!',
    '일정에 맞게 코디를 알려드려요!',
    '밈에 드는 코디는 북마크로 저장',
  ].map((label, idx) => ({
    src: `/onboarding-${idx + 1}.png`,
    alt: `온보딩 이미지 ${idx}`,
    message: label,
  }));

  return (
    <div className="w-full max-w-xl mx-auto py-14">
      <Carousel
        slides={images.map(item => (
          <div className="relative w-full h-full justify-center flex flex-col items-center">
            <p
              className="text-[24px] font-bold leading-[150%] text-center
                w-[159px]
            "
            >
              {item.message}
            </p>
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-[310px] mt-5 pb-10 object-contain"
              draggable={false}
            />
          </div>
        ))}
      />
    </div>
  );
};
