import { useState } from 'react';

type ModalContent = {
  title: string;
  message: string;
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ModalContent>({
    title: '',
    message: '',
  });

  const openModal = ({ title, message }: ModalContent) => {
    setContent({ title, message });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal, content };
};
