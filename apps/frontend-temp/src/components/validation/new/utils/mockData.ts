import { CardInfo } from '../components/ScrollWindowing/components/CardComponent';
import { getRandomNumber } from './randomUtils'; // Função de números aleatórios

// Função utilitária para gerar um número aleatório entre min e max
export const generateMockData = (count: number): CardInfo[] => {
  return Array.from({ length: count }, (_, index) => ({
    image_url: `https://picsum.photos/seed/${index}/300/200`,
    user_name: `User ${Math.floor(getRandomNumber(1, 10))}`, // Gera um usuário aleatório de 1 a 10
    rectangles: Array.from({ length: Math.floor(getRandomNumber(1, 5)) }, () => ({
      x: getRandomNumber(0, 1),
      y: getRandomNumber(0, 1),
      width: getRandomNumber(0, 1),
      height: getRandomNumber(0, 1),
      class_id: Math.floor(getRandomNumber(1, 2)),
    })),
    timestamp: new Date(),
  }));
};

export const generateMockData2 = (): CardInfo[] => {

    const imagem1 = {
        image_url: 'https://picsum.photos/seed/1/300/200',
        user_name: 'User 1',
        rectangles: [
            {
                x: 0.1,
                y: 0.1,
                width: 0.2,
                height: 0.2,
                class_id: 1
            },
            {
                x: 0.3,
                y: 0.3,
                width: 0.2,
                height: 0.2,
                class_id: 2
            }
        ],
        timestamp: new Date()
    };

    const imagem2 = {
        image_url: 'https://picsum.photos/seed/2/300/200',
        user_name: 'User 2',
        rectangles: [
            {
                x: 0.1,
                y: 0.1,
                width: 0.2,
                height: 0.2,
                class_id: 0
            },
            {
                x: 0.3,
                y: 0.3,
                width: 0.2,
                height: 0.2,
                class_id: 1
            }
        ],
        timestamp: new Date()
    };


    return [imagem1, imagem2];
};