// Função para gerar um número aleatório entre min e max
export const getRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };
  