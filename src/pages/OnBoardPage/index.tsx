import React from 'react';
import Carousel from '../../components/common/Carousel';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
export const OnBoardPage = () => {
  const { oauthRedirect } = useUserStore();
  const images = [
    ['날씨에 맞는', '코디를 추천해요!'],
    ['일정에 맞게', '코디를 알려드려요!'],
    ['맘에 드는', '코디는 북마크로 저장'],
  ].map((label, idx) => ({
    src: `/onboarding-${idx + 1}.png`,
    alt: `온보딩 이미지 ${idx}`,
    message: label,
  }));

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-xl mx-auto pt-[53px]">
      <Carousel
        slides={images.map(item => (
          <div className="relative w-full justify-center flex flex-col items-center mb-4">
            <p
              className="
                flex flex-col items-center justify-center
              text-[24px] font-bold leading-[150%] text-center break-words w-full break-keep
            "
            >
              {item.message.map((msg, idx) => (
                <span key={idx}>{msg}</span>
              ))}
            </p>
            <div className="w-full max-w-[375px] aspect-[375/310] mt-5 pb-5">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
          </div>
        ))}
      />
      <div className="mt-7 px-5 flex gap-3">
        <Button intent="outline" size="large" side="full" className="w-1/2">
          둘러보기123456
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
        <button
          onClick={() => oauthRedirect('kakao')}
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
        >
          <Icon name="icon-kakao-logo" width={52} height={52} alt="카카오 로그인" />
        </button>
        <button
          onClick={() => oauthRedirect('google')}
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
        >
          <Icon name="icon-google-logo" width={52} height={52} alt="구글 로그인" />
        </button>
      </div>
      <div className="mt-5 text-center text-sm">
        <span className="text-gray-500">계정이 없으신가요? </span>
        <button className="text-black font-semibold hover:underline">회원가입 하기</button>
      </div>
    </div>
  );
};
