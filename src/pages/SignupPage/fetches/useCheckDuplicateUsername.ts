import { useQuery } from '@tanstack/react-query';
import { checkDuplicateUsername } from '../apis';

export const useCheckDuplicateUsername = (username: string | undefined) => {
  return useQuery({
    queryKey: ['username'],
    queryFn: async () => await checkDuplicateUsername(username),
    enabled: false,
  });
};
