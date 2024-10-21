// src/components/FilterForm/templates/FilterTemplate.tsx
import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import FilterUserSelect from '../components/FilterUserSelect';
import FilterClassSelect from '../components/FilterClassSelect';
import { FiltersContext } from '../../../contexts/FiltersContext';

interface FilterTemplateProps {
  onApplyFilters: (filters: any) => void;
  onClearFilters: () => void;
}

const FilterTemplate: React.FC<FilterTemplateProps> = ({ onApplyFilters, onClearFilters }) => {
  const { startDate, endDate, sortOrder } = useContext(FiltersContext)!;
  const [localStartDate, setLocalStartDate] = useState('');
  const [localEndDate, setLocalEndDate] = useState('');
  const [localSortOrder, setLocalSortOrder] = useState('asc');

  // Atualiza o estado local com as informações do contexto diretamente
  useEffect(() => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
    setLocalSortOrder(sortOrder);
  }, [startDate, endDate, sortOrder]);

  const handleApply = () => {
    onApplyFilters({
      startDate: localStartDate,
      endDate: localEndDate,
      sortOrder: localSortOrder,
    });
  };

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <FilterUserSelect />
          </Col>
          <Col md={6}>
            <FilterClassSelect />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="formStartDate">
              <Form.Label>Data de Início</Form.Label>
              <Form.Control
                type="date"
                value={localStartDate}
                onChange={e => setLocalStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="formEndDate">
              <Form.Label>Data de Fim</Form.Label>
              <Form.Control
                type="date"
                value={localEndDate}
                onChange={e => setLocalEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="formSortOrder">
              <Form.Label>Ordenar por Data</Form.Label>
              <Form.Select
                value={localSortOrder}
                onChange={e => setLocalSortOrder(e.target.value)}
              >
                <option value="asc">Data Crescente</option>
                <option value="desc">Data Decrescente</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <div className="d-flex justify-content-end mt-4">
        <Button variant="secondary" onClick={onClearFilters} className="me-2">
          Limpar Filtros
        </Button>
        <Button variant="primary" onClick={handleApply}>
          Aplicar Filtros
        </Button>
      </div>
    </>
  );
};

export default FilterTemplate;
