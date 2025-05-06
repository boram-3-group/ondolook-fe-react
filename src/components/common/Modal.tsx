type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  onMove: () => void;
  title: string;
  message: string;
  firstText?: string;
  secondText?: string;
};

export const Modal = ({
  isOpen,
  closeModal,
  onMove,
  title,
  message,
  firstText = '로그인 하기',
  secondText = '그냥 둘러보기',
}: ModalProps) => {
  if (!isOpen) return null;
  return (
    <>
      <div
        className={
          'fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 bg-black bg-opacity-50 opacity-100'
        }
        onClick={closeModal}
      >
        <div
          className={
            'bg-white rounded-2xl w-[90%] max-w-[360px] flex flex-col items-center p-4 transition-all duration-200 opacity-100 scale-100'
          }
          style={{ height: 238 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="font-bold text-xl mb-2 mt-2">{title}</div>
          <div className="text-gray-500 text-base mb-6 whitespace-pre-line">{message}</div>
          <button
            className="w-full h-12 bg-blue-500 text-white rounded-lg text-base mb-2"
            style={{ height: 48 }}
            onClick={onMove}
          >
            {firstText}
          </button>
          <button
            className="w-full h-12 bg-[#F0F0F0] text-[#717171] rounded-lg text-base"
            style={{ height: 48 }}
            onClick={closeModal}
          >
            {secondText}
          </button>
        </div>
      </div>
    </>
  );
};
