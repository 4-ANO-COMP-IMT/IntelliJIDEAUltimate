import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';
import { CardInfo } from '../components/ScrollWindowing/components/CardComponent';
import { generateMockData, generateMockData2 } from '../utils/mockData'; // Certifique-se de que esse caminho esteja correto

interface QueryContextType {
  images: CardInfo[];
  isLoading: boolean;
}

const QueryContext = createContext<QueryContextType>({
  images: [],
  isLoading: true,
});

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [images, setImages] = useState<CardInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula uma chamada de API, com um delay de 3 segundos
    const fetchImages = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Espera 3 segundos
    //   const data = generateMockData(201); // Gera os dados simulados
      const data = generateMockData2(); // Gera os dados simulados
      setImages(data);
      setIsLoading(false);
    };

    fetchImages();
  }, []);

  return (
    <QueryContext.Provider value={{ images, isLoading }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => useContext(QueryContext);
