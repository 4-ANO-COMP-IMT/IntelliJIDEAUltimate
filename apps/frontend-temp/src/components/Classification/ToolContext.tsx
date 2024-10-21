import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

interface ToolContextType {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const useToolContext = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error('useToolContext must be used within a ToolProvider');
  }
  return context;
};

export const ToolProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState<string>('draw'); // Default tool is "draw"

  return (
    <ToolContext.Provider value={{ selectedTool, setSelectedTool }}>
      {children}
    </ToolContext.Provider>
  );
};
