import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookmarks, deleteBookmark, addBookmark, BookmarkItem } from '../apis';
import { OutfitPayload } from '../../HomePage/type';

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

  const deleteBookmarks = async (outfit_image_ids: string[]) => {
    for (const outfit_image_id of outfit_image_ids) {
      await mutateAsync(outfit_image_id);
    }
  };

  return { deleteBookmarks, isPending, error };
};

export const useDeleteBookmarkById = ({ lat, lon, eventType, gender }: OutfitPayload) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (outfit_image_id: string) => deleteBookmark(outfit_image_id),

    onMutate: async (outfit_image_id: string) => {
      await queryClient.cancelQueries({ queryKey: ['outfit', lat, lon, eventType, gender] });
      const prevData = queryClient.getQueryData(['outfit', lat, lon, eventType, gender]);
      queryClient.setQueryData(['outfit', lat, lon, eventType, gender], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          fileMetadata: old.fileMetadata.map((file: any) =>
            String(file.id) === outfit_image_id ? { ...file, bookmarked: false } : file
          ),
        };
      });
      return { prevData };
    },

    onError: (error, context: any) => {
      queryClient.setQueryData(['outfit', lat, lon, eventType, gender], context.prevData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outfit', lat, lon, eventType, gender] });
    },
  });
};

export const useAddBookmarkById = ({ lat, lon, eventType, gender }: OutfitPayload) => {
  const queryClient = useQueryClient();
  console.log('adddddddd');
  return useMutation({
    mutationFn: (outfit_image_id: string) => addBookmark(outfit_image_id),

    onMutate: async (outfit_image_id: string) => {
      await queryClient.cancelQueries({ queryKey: ['outfit', lat, lon, eventType, gender] });
      const prevData = queryClient.getQueryData(['outfit', lat, lon, eventType, gender]);

      queryClient.setQueryData(['outfit', lat, lon, eventType, gender], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          fileMetadata: old.fileMetadata.map((file: any) =>
            String(file.id) === outfit_image_id ? { ...file, bookmarked: true } : file
          ),
        };
      });

      return { prevData };
    },

    onError: (error, context: any) => {
      queryClient.setQueryData(['outfit', lat, lon, eventType, gender], context.prevData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outfit', lat, lon, eventType, gender] });
    },
  });
};
