import React, { useState } from 'react';
import { useSecessionUser } from '../fetches/useSecessionUser';
import { Modal } from '../../../components/common/Modal';
import { useModalStore } from '../../../store/useModalStore';
import { useUserStore } from '../../../store/useUserStore';
const REASONS = [
  '자주 이용하지 않아서',
  '이용이 불편하고 버그가 많아서',
  '코디 추천 기능 불만족',
  '알림 기능 불만족',
];

const Secession = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { mutate } = useSecessionUser();
  const buttonStyle = `
    w-full h-12 rounded-lg
    text-lg font-pretendard
    ${selected !== null ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}
  `;
  const pushModal = useModalStore(state => state.pushModal);
  const popModal = useModalStore(state => state.popModal);
  const currentModal = useModalStore(state => state.currentModal);
  const { user } = useUserStore();
  const handleSecession = () => {
    if (selected === null) return;
    console.log(user?.id);
    mutate({ userId: user?.id || '', reasonId: selected + 1 });
  };

  return (
    <div className="w-full h-full flex flex-col flex-1 px-5 bg-white pt-10">
      <div
        className="text-black font-pretendard text-[24px] font-bold leading-[36px] tracking-[-0.02em]"
        style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
      >
        탈퇴하는 이유를
        <br />
        알려주세요.
      </div>
      <div className="flex flex-col gap-[20px] mt-5">
        {REASONS.map((reason, idx) => (
          <label
            key={reason}
            className="flex items-center cursor-pointer font-pretendard text-[16px] font-medium leading-[24px] text-[#2D2D2D] select-none"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            <span className="relative mr-3 flex items-center">
              <input
                type="radio"
                name="secession-reason"
                checked={selected === idx}
                onChange={() => setSelected(idx)}
                className="peer appearance-none w-5 h-5 rounded-full border border-gray-300 checked:border-blue-500 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                style={{ minWidth: 20, minHeight: 20 }}
              />
              {/* 체크 표시 */}
              <span
                className="pointer-events-none absolute left-0 top-0 w-5 h-5 flex items-center justify-center"
                style={{ display: selected === idx ? 'flex' : 'none' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#4090FF" />
                  <path
                    d="M7 12.5L11 16.5L17 9.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
            {reason}
          </label>
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <button
          className={buttonStyle + ' mb-5 mx-auto block'}
          disabled={selected === null}
          onClick={() =>
            pushModal({
              type: 'secession',
              onMove: () => {
                handleSecession();
              },
              closeModal: popModal,
            })
          }
        >
          탈퇴하기
        </button>
      </div>
      {currentModal && (
        <Modal
          closeModal={currentModal.closeModal}
          onMove={currentModal.onMove}
          title={currentModal.title}
          message={currentModal.message}
          firstText={'탈퇴하기'}
          secondText={'계속 머무르기'}
          type={currentModal.type}
        />
      )}
    </div>
  );
};

export default Secession;
