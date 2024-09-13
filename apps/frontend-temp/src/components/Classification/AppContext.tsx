import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  class_id: number;
}

interface AppContextType {
  is_loading: boolean;
  is_sending: boolean;
  rectangles: Rectangle[];
  image_url: string;
  setIsLoading: (value: boolean) => void;
  setIsSending: (value: boolean) => void;
  addRectangle: (rect: Rectangle) => void;
  removeRectangle: (index: number) => void;
  clearRectangles: () => void;
  setImageUrl: (url: string) => void;
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
  const [image_url, setImageUrl] = useState<string>('https://picsum.photos/1000/600');

  const addRectangle = (rect: Rectangle) => {
    setRectangles((prev) => [...prev, rect]);
  };

  const removeRectangle = (index: number) => {
    setRectangles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearRectangles = () => {
    setRectangles([]);
  };

  // Function to send rectangles to the API
  const sendRectangles = async () => {
    setIsSending(true);
    try {
      console.log('Sending rectangles:', rectangles);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate sending (place your request here)
    } catch (error) {
      console.error('Error sending rectangles:', error);
    } finally {
      setIsSending(false);
      clearRectangles(); // Clear rectangles after sending
    }
  };

  // Function to load the next image
  const loadNextImage = async () => {
    setIsLoading(true);
    try {
      console.log('Loading next image...');
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

      // Generate a new random image URL from Picsum
      const newImageUrl = `https://picsum.photos/1000/600?random=${Date.now()}`;

      setImageUrl(newImageUrl);
    } catch (error) {
      console.error('Error loading next image:', error);
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
        setIsLoading,
        setIsSending,
        addRectangle,
        removeRectangle,
        clearRectangles,
        setImageUrl,
        sendRectangles,
        loadNextImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
