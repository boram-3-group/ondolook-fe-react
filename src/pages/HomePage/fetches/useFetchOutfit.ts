import { useQuery } from '@tanstack/react-query';
import { OutfitPayload } from '../type';
import { getOutfit } from '../apis';

export const useFetchOutfit = ({ lat, lon, eventType, gender }: OutfitPayload) => {
  return useQuery({
    queryKey: ['outfit', lat, lon, eventType, gender],
    queryFn: async () => await getOutfit({ lat, lon, eventType, gender }),
  });
};
