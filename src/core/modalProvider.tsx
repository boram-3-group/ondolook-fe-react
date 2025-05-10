import { useState } from 'react';
import { useModalStore } from '../store/useModalStore';
import { modalManager } from './modal.tsx';

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modalQueue = modalManager.registerModals();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        zIndex: 1000,
      }}
    >
      {children}
      {modalQueue &&
        modalQueue.map(modal => {
          return modal.render();
        })}
    </div>
  );
};

export default ModalProvider;
