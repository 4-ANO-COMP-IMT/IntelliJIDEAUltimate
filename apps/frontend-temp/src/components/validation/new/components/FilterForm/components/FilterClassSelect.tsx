// src/components/FilterForm/components/FilterClassSelect.tsx
import React, { useState, useEffect, useContext } from 'react';
import Select, { MultiValue } from 'react-select';
import useFetchClasses from '../hooks/useFetchClasses';
import { FiltersContext } from '../../../contexts/FiltersContext';

interface OptionType {
  value: string;
  label: string;
}

const FilterClassSelect: React.FC = () => {
  const { selectedClasses } = useContext(FiltersContext)!; // Pegando as classes do contexto
  const { classes, loadingClasses } = useFetchClasses();
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionType>>([]);

  // Quando as classes são carregadas, atualiza o estado da seleção com base no contexto
  useEffect(() => {
    if (!loadingClasses && classes.length > 0) {
      const preselected = classes.filter(cls => (selectedClasses || []).includes(cls.value));
      setSelectedOptions(preselected);
    }
  }, [loadingClasses, classes, selectedClasses]);

  return (
    <Select
      isMulti
      options={classes}
      value={selectedOptions}
      onChange={setSelectedOptions}
      isLoading={loadingClasses}
      placeholder="Selecione as classes"
      isSearchable
    />
  );
};

export default FilterClassSelect;
