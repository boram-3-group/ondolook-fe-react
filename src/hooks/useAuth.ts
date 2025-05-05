import { useUserStore } from '../store/useUserStore';
import { toast } from 'react-hot-toast';
export const useAuth = () => {
  const { isLoggedIn } = useUserStore();

  const isAuthCheck = (onClickevent: () => void) => {
    if (!isLoggedIn()) {
      toast.success('로그인 필요해요.');
    } else {
      onClickevent();
    }
  };

  return { isAuthCheck };
};
