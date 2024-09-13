import React from 'react';
import FilterForm from '../components/FilterForm';
import { FiltersProvider } from '../contexts/FiltersContext';
import { QueryProvider } from '../contexts/QueryContext'; // Novo contexto de queries
import { ModalProvider } from '../contexts/ModalContext';
import GridComponent from '../components/ScrollWindowing';
import ImageModal from '../components/ImageModal';

const NewValidationPage: React.FC = () => {
  return (
    <FiltersProvider>
      <QueryProvider>
        <ModalProvider>
          <div className="container mt-4">
            <h2>Validação de imagens</h2>
            <FilterForm />
            <GridComponent />
            <ImageModal />
          </div>
        </ModalProvider>
      </QueryProvider>
    </FiltersProvider>
  );
};

export default NewValidationPage;
