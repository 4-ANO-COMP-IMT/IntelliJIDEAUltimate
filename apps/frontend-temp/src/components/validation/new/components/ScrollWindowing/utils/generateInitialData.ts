export interface CardData {
  id: number;
  isLoading: boolean;
  isLoaded: boolean;
}

export const generateInitialData = (start: number, count: number): CardData[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: start + index,
    isLoading: true,
    isLoaded: false,
  }));
};
