import React from 'react';

interface FloatingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-blue-500 text-white border-none shadow-lg flex items-center justify-center text-2xl cursor-pointer hover:bg-blue-700"
    >
      {children}
    </button>
  );
};

export default FloatingButton;
