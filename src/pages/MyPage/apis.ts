import { api } from '../../core/axios';
import { AxiosError } from 'axios';

export interface BookmarkItem {
  id: number;
  outfitImage: {
    id: number;
    title: string;
    description: string;
    metadata: {
      presignedUrl: string;
    };
  };
}

export const getBookmarks = async (): Promise<BookmarkItem[]> => {
  try {
    const { data } = await api.service.get('/api/v1/bookmark');
    return data.content || [];
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('북마크 조회에 실패했습니다.');
    }
    return [];
  }
};

export const deleteBookmark = async (outfit_image_id: string) => {
  try {
    const res = await api.service.delete(`/api/v1/bookmark/${outfit_image_id}`);
    return res && res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('북마크 삭제에 실패했습니다.');
    }
  }
};

export const addBookmark = async (outfit_image_id: string) => {
  try {
    const res = await api.service.post(`/api/v1/bookmark/${outfit_image_id}`);
    return res && res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('북마크 추가에 실패했습니다.');
    }
  }
};

export const secessionUser = async (userId: string, reasonId: number) => {
  try {
    const res = await api.service.delete(`/api/v1/user/${userId}/reason-id/${reasonId}`);
    return res && res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('회원 탈퇴에 실패했습니다.');
    }
  }
};

export const changeUserPassword = async (userId: string, newPassword: string) => {
  try {
    const res = await api.service.put(`/api/v1/user/${userId}/password`, newPassword, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res && res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('비밀번호 변경에 실패했습니다.');
    }
  }
};
