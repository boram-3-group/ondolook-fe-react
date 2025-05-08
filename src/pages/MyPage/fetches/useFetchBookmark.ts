import { useQuery, useMutation } from '@tanstack/react-query';
import { getBookmarks, deleteBookmark, addBookmark, BookmarkItem } from '../apis';

export const useFetchBookmark = () => {
  const { data, isLoading, error } = useQuery<BookmarkItem[]>({
    queryKey: ['bookmarks'],
    queryFn: getBookmarks,
  });

  return { data, isLoading, error };
};

export const useDeleteBookmark = () => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: deleteBookmark,
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
