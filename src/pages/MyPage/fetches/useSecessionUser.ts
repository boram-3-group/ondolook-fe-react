import { useMutation, useQuery } from '@tanstack/react-query';
import { getSecessionReason, SecessionReasonItem, secessionUser } from '../apis';

export const useSecessionUser = () => {
  return useMutation({
    mutationFn: ({ userId, reasonId }: { userId: string; reasonId: number }) =>
      secessionUser(userId, reasonId),
  });
};

export const useFetchSecessionReason = () => {
  const { data, isLoading, error } = useQuery<SecessionReasonItem[]>({
    queryKey: ['secessionreason'],
    queryFn: getSecessionReason,
  });

  return { data, isLoading, error };
};
