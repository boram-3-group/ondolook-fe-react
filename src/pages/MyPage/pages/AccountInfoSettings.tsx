import React, { useState, useEffect } from 'react';
import { Icon } from '../../../components/common/Icon';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../store/useUserStore';
import toast from 'react-hot-toast';
export const AccountInfoSettings = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // 나타날 때 자연스러운 애니메이션을 위해
  const openModal = () => {
    setModalVisible(true);
    setTimeout(() => setShowLogoutModal(true), 0); // 다음 tick에 true로
  };
  const closeModal = () => {
    setShowLogoutModal(false);
  };

  // 닫힐 때 트랜지션 후 unmount
  useEffect(() => {
    if (!showLogoutModal && modalVisible) {
      const timeout = setTimeout(() => setModalVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [showLogoutModal, modalVisible]);

  const handleLogout = () => {
    closeModal();
    logout();
    setTimeout(() => {
      navigate('/', { replace: true });
      toast.success('로그아웃 되었습니다.');
    }, 200);
  };

  return (
    <div className="flex flex-col px-4 mt-8 w-full min-h-full bg-white">
      <button
        className="flex w-full items-center justify-between py-5 border-b border-gray-200"
        onClick={() => navigate('/reset-password/newpassword')}
      >
        <div className="flex items-center">
          <div className="text-base font-medium leading-[150%] text-[#2D2D2D]">비밀번호 변경</div>
        </div>
        <span>
          <Icon name="chevron-right" width={16} height={16} />
        </span>
      </button>
      <button
        className="flex w-full items-center justify-between py-5 border-b border-gray-200"
        onClick={openModal}
      >
        <div className="flex items-center">
          <div className="text-base font-medium leading-[150%] text-[#2D2D2D]">로그아웃</div>
        </div>
      </button>
      <button
        className="flex w-full items-center justify-between py-5"
        onClick={() => navigate('/my/secession')}
      >
        <div className="flex items-center">
          <div className="text-base font-medium leading-[150%]">탈퇴하기</div>
        </div>
      </button>

      {/* 로그아웃 팝업 */}
      {modalVisible && (
        <div
          className={
            'fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ' +
            (showLogoutModal
              ? 'bg-black bg-opacity-50 opacity-100'
              : 'bg-black bg-opacity-50 opacity-0')
          }
          onClick={closeModal}
        >
          <div
            className={
              'bg-white rounded-2xl w-[90%] max-w-[360px] flex flex-col items-center p-4 transition-all duration-200 ' +
              (showLogoutModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95')
            }
            style={{ height: 238 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="font-bold text-xl mb-2 mt-2">로그아웃</div>
            <div className="text-gray-500 text-base mb-6">정말로 로그아웃하시겠어요?</div>
            <button
              className="w-full h-12 bg-blue-500 text-white rounded-lg text-base mb-2"
              style={{ height: 48 }}
              onClick={handleLogout}
            >
              로그아웃
            </button>
            <button
              className="w-full h-12 bg-[#F0F0F0] text-[#717171] rounded-lg text-base"
              style={{ height: 48 }}
              onClick={closeModal}
            >
              뒤로 가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Tailwind에 없는 animate-modalIn을 위한 스타일 추가
// @layer utilities {
//   .animate-modalIn {
//     @apply opacity-100 scale-100;
//   }
// }
