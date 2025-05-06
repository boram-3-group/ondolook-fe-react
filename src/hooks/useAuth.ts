import { useUserStore } from '../store/useUserStore';

export const useAuth = () => {
  const { isLoggedIn } = useUserStore();

  const isAuth = () => {
    return isLoggedIn();
  };

  return { isAuth };
};
