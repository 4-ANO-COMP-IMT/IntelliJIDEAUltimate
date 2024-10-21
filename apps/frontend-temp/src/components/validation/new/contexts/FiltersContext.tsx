// src/contexts/FiltersContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface FiltersContextType {
  selectedUsers: string[];
  selectedClasses: string[];
  startDate: string;
  endDate: string;
  sortOrder: string;
  setFilters: (filters: {
    selectedUsers: string[];
    selectedClasses: string[];
    startDate: string;
    endDate: string;
    sortOrder: string;
  }) => void;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFiltersState] = useState({
    selectedUsers: [] as string[],
    selectedClasses: [] as string[],
    startDate: '',
    endDate: '',
    sortOrder: 'asc',
  });

  const setFilters = (newFilters: {
    selectedUsers: string[];
    selectedClasses: string[];
    startDate: string;
    endDate: string;
    sortOrder: string;
  }) => {
    setFiltersState(newFilters);
  };

  return (
    <FiltersContext.Provider value={{ ...filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};
