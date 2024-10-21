import { useState, useEffect } from 'react';
import { fetchMockUsers } from '../../../services/mockApi';

interface OptionType {
  value: string;
  label: string;
}

const useFetchUsers = () => {
  const [users, setUsers] = useState<OptionType[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    setLoadingUsers(true);
    fetchMockUsers().then((data) => {
      const userOptions = data.map(user => ({ value: user, label: user }));
      setUsers(userOptions);
      setLoadingUsers(false);
    });
  }, []);

  return { users, loadingUsers };
};

export default useFetchUsers;
