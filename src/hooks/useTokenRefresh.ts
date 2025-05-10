import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../store/useUserStore';
import { api } from '../core/axios';

export const useTokenRefresh = () => {
  const { setAccessToken } = useUserStore();

  return useQuery({
    queryKey: ['token-refresh'],
    queryFn: async () => {
      const response = await api.service.post('/api/v1/auth/reissue');
      const { access } = response.data;
      setAccessToken(access);
      return access;
    },
    retry: false,
    enabled: false,
  });
};
