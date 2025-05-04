import { useUserStore } from '../store/useUserStore';

export const useAuth = () => {
  const { isLoggedIn } = useUserStore();

  const isAuthCheck = (onClickevent: () => void) => {
    if (!isLoggedIn()) {
      window.alert('로그인 필요');
    } else {
      onClickevent();
    }
  };

  return { isAuthCheck };
};
