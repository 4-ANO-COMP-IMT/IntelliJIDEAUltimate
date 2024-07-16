import React from "react";
import { Form } from "react-bootstrap";

const TypeFilter: React.FC = () => {
        return (
                <Form.Group controlId="typeFilter">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control type="text" placeholder="Digite o tipo" />
                </Form.Group>
        );
};

export default TypeFilter;
