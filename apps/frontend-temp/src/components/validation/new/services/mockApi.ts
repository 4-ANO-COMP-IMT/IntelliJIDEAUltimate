export const fetchMockImages = async (filters: any) => {
  // Mock de resposta com base nos filtros
  return [
    {
      src: 'https://example.com/image1.jpg',
      rectangles: [{ x: 10, y: 10, width: 50, height: 50, fill: 'red' }],
      user: 'user1',
    },
    {
      src: 'https://example.com/image2.jpg',
      rectangles: [{ x: 20, y: 20, width: 60, height: 60, fill: 'blue' }],
      user: 'user2',
    },
  ];
};


// src/services/mockApi.ts
export const fetchMockUsers = async () => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(['user1', 'user2', 'user3', 'user4','user5','user6','user7','user8','user9','user10']);
    }, 5000); // Delay de 1 segundo
  });
};

export const fetchMockClasses = async () => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(['class1', 'class2', 'class3', 'class4']);
    }, 5000); // Delay de 1 segundo
  });
};
