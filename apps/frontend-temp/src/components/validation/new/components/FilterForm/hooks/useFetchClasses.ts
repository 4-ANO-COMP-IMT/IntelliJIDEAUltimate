import { useState, useEffect } from 'react';
import { fetchMockClasses } from '../../../services/mockApi';

interface OptionType {
  value: string;
  label: string;
}

const useFetchClasses = () => {
  const [classes, setClasses] = useState<OptionType[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(false);

  useEffect(() => {
    setLoadingClasses(true);
    fetchMockClasses().then((data) => {
      const classOptions = data.map(cls => ({ value: cls, label: cls }));
      setClasses(classOptions);
      setLoadingClasses(false);
    });
  }, []);

  return { classes, loadingClasses };
};

export default useFetchClasses;
