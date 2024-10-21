import React, { useState, useContext } from "react";
import { Button, Modal } from 'react-bootstrap';
import { FiltersContext } from '../../contexts/FiltersContext';
import FilterTemplate from './templates/FilterTemplate';

const FilterForm: React.FC = () => {
  const { setFilters } = useContext(FiltersContext)!;
  const [showModal, setShowModal] = useState(false);

  // Aplicar os filtros selecionados e fechar o modal
  const handleApplyFilters = (filters: any) => {
    setFilters(filters);
    setShowModal(false);
  };

  // Limpar os filtros sem fechar o modal
  const handleClearFilters = () => {
    // Implementação adicional se necessária
  };

  return (
    <>
      {/* Modal que contém o formulário de filtros */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Configurações de Filtro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilterTemplate onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} />
        </Modal.Body>
      </Modal>

      {/* Botão flutuante para abrir o modal de filtros */}
      <Button
        onClick={() => setShowModal(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1050,
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          backgroundColor: '#007bff',
          color: '#fff',
        }}
      >
        Filtros
      </Button>
    </>
  );
};

export default FilterForm;
