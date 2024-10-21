import { useState, useEffect } from 'react';

export const useFetchUsers = () => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    // Mock de busca de usuários
    setUsers(['user1', 'user2', 'user3']);
  }, []);

  return users;
};
