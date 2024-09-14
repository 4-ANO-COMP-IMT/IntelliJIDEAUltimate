// src/components/pages/ForbiddenPage.tsx

import React from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { FaBan } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');  // Navega para a página inicial, pode ser ajustado conforme necessário
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} className="text-center">
          <Alert variant="danger" className="p-5">
            <FaBan size={100} className="mb-4" />
            <h1 style={{ fontSize: '3rem' }}>Acesso Negado</h1>
            <p style={{ fontSize: '1.5rem' }}>Você não tem permissão para acessar esta página.</p>
            <Button variant="primary" size="lg" onClick={handleGoHome}>
              Voltar para a Página Inicial
            </Button>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default ForbiddenPage;
