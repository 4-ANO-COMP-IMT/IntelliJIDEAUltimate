import React from 'react';
import { Form } from 'react-bootstrap';

const FlagFilter: React.FC = () => {
    return (
        <Form.Group controlId="flagFilter">
            <Form.Label>Flag</Form.Label>
            <Form.Check type="checkbox" label="Ativar flag" />
        </Form.Group>
    );
};

export default FlagFilter;
