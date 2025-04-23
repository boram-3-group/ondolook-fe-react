import { useQuery } from '@tanstack/react-query';
import { getCategory } from '../apis';

export const useFetchCategory = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => await getCategory(),
  });
};
