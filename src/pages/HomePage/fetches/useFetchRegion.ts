import { useQuery } from '@tanstack/react-query';
import { RegionPayload } from '../type';
import { getRegion } from '../apis';

export const useFetchRegion = ({ lat, lon }: RegionPayload, options?: any) => {
  return useQuery({
    queryKey: ['region', lat, lon],
    queryFn: async () => await getRegion({ lat, lon }),
    enabled: options?.enabled,
  });
};
