import { DefaultModal } from '../components/modals/DefaultModal';

class ModalInstance {
  constructor(
    private id: string,
    private type: string,
    private title: string,
    private message: string,
    private firstText: string,
    private secondText: string,
    private onFirstClick: () => void,
    private onSecondClick: () => void
  ) {
    this.render();
  }

  public getModalId() {
    return this.id;
  }

  public render() {
    if (this.type === 'default') {
      return (
        <DefaultModal
          title={this.title}
          message={this.message}
          firstText={this.firstText}
          secondText={this.secondText}
          onFirstClick={this.onFirstClick}
          onSecondClick={this.onSecondClick}
        />
      );
    }
  }
}

class ModalManager {
  private madalQueue: ModalInstance[] = [];
  private static modalInstance: ModalManager;

  public static getInstance() {
    if (!ModalManager.modalInstance) {
      ModalManager.modalInstance = new ModalManager();
    }
    return ModalManager.modalInstance;
  }

  public show({
    id,
    type,
    title,
    message,
    firstText,
    secondText,
    onFirstClick,
    onSecondClick,
  }: {
    id: string;
    type: string;
    title: string;
    message: string;
    firstText: string;
    secondText: string;
    onFirstClick: () => void;
    onSecondClick: () => void;
  }) {
    this.madalQueue.push(
      new ModalInstance(
        id,
        type,
        title,
        message,
        firstText,
        secondText,
        onFirstClick,
        onSecondClick
      )
    );
  }
  public close(modalId: string) {
    const targetMadal = this.madalQueue.find(modal => modal.getModalId() === modalId);
    if (targetMadal) {
      this.madalQueue.splice(this.madalQueue.indexOf(targetMadal), 1);
    }
  }

  public registerModals() {
    return this.madalQueue;
  }
}

export const modalManager = ModalManager.getInstance();

// const useModal = () => {
//   const modalManager = ModalManager.getInstance();
//   return modalManager;
// };

// const modal = useModal();
// modal.show({
//   id: '1',
//   type: 'default',
//   title: '알림',
//   message: '알림 메시지',
//   firstText: '첫번째 버튼',
//   secondText: '두번째 버튼',
//   onFirstClick: () => {},
//   onSecondClick: () => {},
// });

// // modalManager => provider 에서 인스턴스 생성해서 -> 뿌려주기

// modalManager.show({
//   id: '1',
//   type: 'default',
//   title: '알림',
//   message: '알림 메시지',
//   firstText: '첫번째 버튼',
//   secondText: '두번째 버튼',
//   onFirstClick: () => {},
//   onSecondClick: () => {},
// });

// modalManager.show({
//   id: '2',
//   type: 'default',
//   title: '알림',
//   message: '알림 메시지',
//   firstText: '첫번째 버튼',
//   secondText: '두번째 버튼',
//   onFirstClick: () => {},
//   onSecondClick: () => {},
// });
