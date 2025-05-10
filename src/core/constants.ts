export const serviceUrl = {
  base_url: import.meta.env.VITE_APP_API_BASE_URL,
};

export const steps = ['인증', '계정입력', '프로필입력', '가입완료'];

export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const ModalContents: Record<string, { title: string; message: string }> = {
  bookmark: {
    title: '맘에 드는 코디, 나중에 또 보려면?',
    message: '로그인하면 코디를 저장할 수 있어요!',
  },
  alarm: {
    title: '놓치지 않게 미리 알려드려요!',
    message: '알림 설정은 로그인 후에 가능해요',
  },
  category: {
    title: '맞춤 일정 코디, 궁금하신가요?',
    message: '내 일정에 맞는 코디를 \n 보려면 로그인이 필요해요',
  },
  mypage: {
    title: '나만의 코디, 나중에 또 보려면?',
    message: '로그인하면 저장한 \n 코디를 한눈에 볼 수 있어요',
  },
  carousel: {
    title: '지금은 이 코디만 볼 수 있어요!',
    message: '온도룩에 로그인하고 \n 더 다양한 코디를 추천 받아보세요',
  },
  default: {
    title: '로그인해야 확인 가능해요.',
    message: '로그인을 해주세요.',
  },
  'delete-Bookmark': {
    title: '삭제하기',
    message: '선택하신 코디를 삭제하시겠어요?',
  },
};
