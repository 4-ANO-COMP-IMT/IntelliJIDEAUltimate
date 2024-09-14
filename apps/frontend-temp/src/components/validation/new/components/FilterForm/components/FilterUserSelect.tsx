// src/components/FilterForm/components/FilterUserSelect.tsx
import React, { useState, useEffect, useContext } from 'react';
import Select, { MultiValue } from 'react-select';
import useFetchUsers from '../hooks/useFetchUsers';
import { FiltersContext } from '../../../contexts/FiltersContext';

interface OptionType {
  value: string;
  label: string;
}

const FilterUserSelect: React.FC = () => {
  const { selectedUsers } = useContext(FiltersContext)!; // Pegando os usuários do contexto
  const { users, loadingUsers } = useFetchUsers();
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionType>>([]);

  // Quando os usuários são carregados, atualiza o estado da seleção com base no contexto
  useEffect(() => {
    if (!loadingUsers && users.length > 0) {
      console.log(`selected users: ${selectedUsers}`)
      const preselected = users.filter(user => {
        console.log(`user: ${user}`)
        return (selectedUsers || []).includes(user.value);
      });
      setSelectedOptions(preselected);
    }
  }, [loadingUsers, users, selectedUsers]);

  return (
    <Select
      isMulti
      options={users}
      value={selectedOptions}
      onChange={setSelectedOptions}
      isLoading={loadingUsers}
      placeholder="Selecione os usuários"
      isSearchable
    />
  );
};

export default FilterUserSelect;
