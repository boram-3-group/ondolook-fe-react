import { create } from 'zustand';
import { ModalContents } from '../core/constants';

/*
  modalProvider에서 큐에 있는 배열을 map으로 출력
  -> 큐에 있는 모달들이 순서대로 
  -> 그러면 usemodalstore에서 zindex를 추가할 필요가 없겠다..
*/

//pushModal() 에서 넘겨받을 데이터
export type pushModalProps = {
  closeModal: () => void;
  onMove: () => void;
  type: string;
};

//modal에 넘겨야할 데이터
export type ModalProps = {
  closeModal: () => void;
  onMove: () => void;
  type: string;
  title: string;
  message: string;
  newZindex?: number;
  firstText?: string;
  secondText: string;
};

type ModalStore = {
  queue: ModalProps[]; // modal이 저장되는 큐
  currentModal: ModalProps | null; // 현재 떠야하는 modal
  pushModal: (modal: pushModalProps) => void; // modal 추가
  popModal: () => void; // modal 삭제
};

export const useModalStore = create<ModalStore>((set, get) => ({
  queue: [],
  currentModal: null,
  pushModal: modal => {
    const { queue } = get();
    const newZindex = queue.length + 1; // modal이 위로 쌓여야하니까 zindex 증가
    const newModal = {
      ...modal,
      title: ModalContents[modal.type].title,
      message: ModalContents[modal.type].message,
      firstText: '로그인 하기',
      secondText: '그냥 둘러보기',
      newZindex,
    };

    set(state => ({
      queue: [...state.queue, newModal],
      currentModal: newModal,
    }));
  },
  popModal: () => {
    const { queue } = get();
    queue.pop();

    set(state => ({
      queue: [...state.queue],
      currentModal: queue[state.queue.length - 1],
    }));
  },
}));
