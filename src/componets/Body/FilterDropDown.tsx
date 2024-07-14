import React from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';

const FilterDropdown: React.FC = () => {
    return (
        <DropdownButton id="dropdown-basic-button" title="Filtros" className="mb-3">
            <Dropdown.Item as="div">
                <Form.Group controlId="dateFilter">
                    <Form.Label>Data</Form.Label>
                    <Form.Control type="date" placeholder="Selecione a data" />
                </Form.Group>
            </Dropdown.Item>
            <Dropdown.Item as="div">
                <Form.Group controlId="classFilter">
                    <Form.Label>Classe</Form.Label>
                    <Form.Control type="text" placeholder="Digite a classe" />
                </Form.Group>
            </Dropdown.Item>
            <Dropdown.Item as="div">
                <Form.Group controlId="regionFilter">
                    <Form.Label>Região</Form.Label>
                    <Form.Control type="text" placeholder="Selecione a região no mapa" />
                </Form.Group>
            </Dropdown.Item>
            <Dropdown.Item as="div">
                <Form.Group controlId="tagsFilter">
                    <Form.Label>Tags Especiais</Form.Label>
                    <Form.Control type="text" placeholder="Digite as tags" />
                </Form.Group>
            </Dropdown.Item>
            <Dropdown.Item as="div">
                <Form.Group controlId="flagFilter">
                    <Form.Label>Flag</Form.Label>
                    <Form.Check type="checkbox" label="Ativar flag" />
                </Form.Group>
            </Dropdown.Item>
            <Dropdown.Item as="div">
                <Form.Group controlId="typeFilter">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control type="text" placeholder="Digite o tipo" />
                </Form.Group>
            </Dropdown.Item>
        </DropdownButton>
    );
};

export default FilterDropdown;
