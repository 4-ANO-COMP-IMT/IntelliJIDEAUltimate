import { useState, useCallback, useRef } from 'react';
import { CardData, generateInitialData } from '../utils/generateInitialData';

export const useInfiniteScroll = (initialCount: number) => {
  const [cards, setCards] = useState<CardData[]>(generateInitialData(0, initialCount));
  const [itemCount, setItemCount] = useState(initialCount);
  const loadedCards = useRef<{ [key: number]: boolean }>({}); // Ref para armazenar os cards carregados

  const loadMoreItems = useCallback(() => {
    const newCards = generateInitialData(itemCount, 10); // Carrega mais 10 cards
    setCards((prevCards) => [...prevCards, ...newCards]);
    setItemCount((prevCount) => prevCount + 10);
  }, [itemCount]);

  const loadCard = (index: number) => {
    if (!loadedCards.current[index]) {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card, i) =>
            i === index ? { ...card, isLoading: false, isLoaded: true } : card
          )
        );
        loadedCards.current[index] = true; // Marca o card como carregado
      }, 1000); // Simula o tempo de carregamento de 1 segundo
    }
  };

  return { cards, itemCount, loadMoreItems, loadCard };
};
