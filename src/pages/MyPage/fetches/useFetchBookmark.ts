import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookmarks, deleteBookmark, addBookmark, BookmarkItem } from '../apis';

export const useFetchBookmark = () => {
  const { data, isLoading, error } = useQuery<BookmarkItem[]>({
    queryKey: ['bookmarks'],
    queryFn: getBookmarks,
  });

  return { data, isLoading, error };
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });

  const deleteBookmarkById = async (outfit_image_id: string) => {
    await mutateAsync(outfit_image_id);
  };

  const deleteBookmarks = async (outfit_image_ids: string[]) => {
    for (const outfit_image_id of outfit_image_ids) {
      await mutateAsync(outfit_image_id);
    }
  };

  return { deleteBookmarkById, deleteBookmarks, isPending, error };
};

export const useAddBookmark = () => {
  return useMutation({
    mutationFn: (outfit_image_id: string) => addBookmark(outfit_image_id),
  });
};
