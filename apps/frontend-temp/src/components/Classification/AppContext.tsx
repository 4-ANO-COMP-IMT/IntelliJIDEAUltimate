import axios from 'axios';
import { classes } from 'config/classes';
import { useAuth } from 'contexts/AuthContext';
import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

interface Rectangle {
  x: number; // Centro X em pixels
  y: number; // Centro Y em pixels
  width: number; // Largura em pixels
  height: number; // Altura em pixels
  class_id: number;
}

interface AppContextType {
  is_loading: boolean;
  is_sending: boolean;
  rectangles: Rectangle[];
  image_url: string | null;
  image_id: number | null;
  image_width: number | null;    // Adicionado
  image_height: number | null;   // Adicionado
  setIsLoading: (value: boolean) => void;
  setIsSending: (value: boolean) => void;
  addRectangle: (rect: Rectangle) => void;
  removeRectangle: (index: number) => void;
  clearRectangles: () => void;
  setImageUrl: (url: string) => void;
  setImageId: (id: number) => void;
  setImageDimensions: (width: number, height: number) => void; // Adicionado
  sendRectangles: () => Promise<void>;
  loadNextImage: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [is_loading, setIsLoading] = useState(false);
  const [is_sending, setIsSending] = useState(false);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [image_url, setImageUrl] = useState<string | null>(null);
  const [image_id, setImageId] = useState<number | null>(null);
  const [image_width, setImageWidth] = useState<number | null>(null);    // Adicionado
  const [image_height, setImageHeight] = useState<number | null>(null);  // Adicionado

  const { user } = useAuth();

  const addRectangle = (rect: Rectangle) => {
    setRectangles((prev) => [...prev, rect]);
  };

  const removeRectangle = (index: number) => {
    setRectangles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearRectangles = () => {
    setRectangles([]);
  };

  // Função para definir as dimensões da imagem
  const setImageDimensions = (width: number, height: number) => {
    setImageWidth(width);
    setImageHeight(height);
  };

  // Função para enviar retângulos para a API
  const sendRectangles = async () => {
    if (image_width === null || image_height === null) {
      console.error('Image dimensions are not set.');
      alert('Erro: as dimensões da imagem não estão definidas.');
      return;
    }

    setIsSending(true);
    try {
      console.log('Sending rectangles:', rectangles);

      // Normalizar os retângulos
      const newRectangles = rectangles.map((rect) => ({
        class_name: classes[rect.class_id].name,
        center_x: rect.x / image_width,      // Normalizado
        center_y: rect.y / image_height,     // Normalizado
        width: rect.width / image_width,      // Normalizado
        height: rect.height / image_height,    // Normalizado
      }));

      const reqBody = {
        image_id: image_id,
        rectangles: newRectangles,
      };

      const headers = {
        headers: {
          'Authorization': `Bearer ${user?.session_token}`,
          'Content-Type': 'application/json', // Garantir que o corpo da requisição seja JSON
        },
      };

      await axios.post('http://localhost:3002/api/classification', reqBody, headers);

      // Opcional: Adicionar feedback ao usuário sobre o sucesso
      alert('Retângulos enviados com sucesso!');
    } catch (error) {
      console.error('Error sending rectangles:', error);
      alert('Erro ao enviar retângulos. Verifique o console para mais detalhes.');
    } finally {
      setIsSending(false);
      clearRectangles(); // Limpar retângulos após o envio
    }
  };

  // Função para carregar a próxima imagem
  const loadNextImage = async () => {
    setIsLoading(true);
    setImageId(null);
    setImageUrl(null);
    setImageWidth(null);   // Resetar dimensões anteriores
    setImageHeight(null);  // Resetar dimensões anteriores

    try {
      console.log('Loading next image...');

      const headers = {
        headers: {
          'Authorization': `Bearer ${user?.session_token}`,
        },
      };

      const response = await axios.post('http://localhost:3002/api/allocate', null, headers);
      const { image_id, image_url } = response.data;

      setImageUrl(image_url);
      setImageId(image_id);

      // Carregar a imagem para obter suas dimensões
      const img = new Image();
      img.src = image_url;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          setImageDimensions(img.width, img.height);
          resolve();
        };
        img.onerror = (err) => reject(err);
      });

    } catch (error: any) {
      if (error.response) {
        // O servidor respondeu com um código de status fora da faixa 2xx
        console.error('Status:', error.response.status);
        console.error('Mensagem de erro:', error.response.data.message); // Mensagem de erro enviada pelo backend
        alert(error.response.data.message);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        console.error('Nenhuma resposta recebida:', error.request);
      } else {
        // Algum outro erro ocorreu na configuração da requisição
        console.error('Erro no loading next image:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        is_loading,
        is_sending,
        rectangles,
        image_url,
        image_id,
        image_width,   // Adicionado
        image_height,  // Adicionado
        setIsLoading,
        setIsSending,
        addRectangle,
        removeRectangle,
        clearRectangles,
        setImageUrl,
        setImageId,
        setImageDimensions, // Adicionado
        sendRectangles,
        loadNextImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
