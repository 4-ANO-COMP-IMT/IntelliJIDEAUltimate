import React, { createContext, useState, useContext, PropsWithChildren } from 'react';
import { CardInfo } from '../components/ScrollWindowing/components/CardComponent'; // Certifique-se de que este caminho seja o correto

interface ModalContextType {
  isOpen: boolean;
  selectedCard: CardInfo | null;
  openModal: (card: CardInfo) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  selectedCard: null,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);

  const openModal = (card: CardInfo) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, selectedCard, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
