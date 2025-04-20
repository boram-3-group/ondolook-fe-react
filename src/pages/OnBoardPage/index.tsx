import React from 'react';
import Carousel from '../../components/common/Carousel';
import { Button } from '../../components/common/Button';
import KakaoIcon from '../../assets/icons/icon-kakao-logo.svg';
import GoogleIcon from '../../assets/icons/icon-google-logo.svg';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-xl mx-auto py-14">
      <Carousel
        slides={images.map(item => (
          <div className="relative w-full h-full justify-center flex flex-col items-center mb-8">
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
              className="w-full h-[310px] mt-5 pb-5 object-contain"
              draggable={false}
            />
          </div>
        ))}
      />
      <div className="mt-8 px-5 flex gap-3">
        <Button intent="outline" size="large" side="full" className="w-1/2">
          둘러보기
        </Button>

        <Button
          intent="primary"
          size="large"
          side="full"
          className="w-1/2"
          onClick={() => navigate('/login/form')}
        >
          온도로 로그인
        </Button>
      </div>
      <div className="my-5 flex items-center px-5">
        <div className="flex-grow h-px bg-gray-200" />
        <span className="mx-5 text-gray-400 text-sm">또는</span>
        <div className="flex-grow h-px bg-gray-200" />
      </div>
      <div className="flex justify-center items-center gap-[28px]">
        <button className="w-[52px] h-[52px] rounded-full flex items-center justify-center">
          <img src={KakaoIcon} alt="카카오 로그인" />
        </button>
        <button className="w-[52px] h-[52px] rounded-full flex items-center justify-center">
          <img src={GoogleIcon} alt="구글 로그인" />
        </button>
      </div>
      <div className="mt-5 text-center text-sm">
        <span className="text-gray-500">계정이 없으신가요? </span>
        <button className="text-black font-semibold hover:underline">회원가입 하기</button>
      </div>
    </div>
  );
};
