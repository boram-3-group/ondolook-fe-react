import { useQuery, useMutation } from '@tanstack/react-query';
import { getBookmarks, deleteBookmark } from '../apis';

interface BookmarkItem {
  id: number;
  imageUrl: string;
}

export const useFetchBookmark = () => {
  const { data, isLoading, error } = useQuery<BookmarkItem[]>({
    queryKey: ['bookmarks'],
    queryFn: getBookmarks,
  });
  return { data: data || [], isLoading, error };
};

export const useDeleteBookmark = () => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: deleteBookmark,
  });

  const deleteBookmarks = async (outfit_image_ids: string[]) => {
    for (const outfit_image_id of outfit_image_ids) {
      await mutateAsync(outfit_image_id);
    }
  };

  return { deleteBookmarks, isLoading: isPending, error };
};
