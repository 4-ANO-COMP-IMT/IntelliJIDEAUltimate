// src/components/HomePage.tsx

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/sign-in');
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Bem-vindo ao Sistema de Classificação de Imagens</h1>
      <p className="lead mb-5">Acesse sua conta para começar a classificar.</p>
      <Button variant="primary" size="lg" onClick={handleLogin}>
        Fazer Login
      </Button>
    </Container>
  );
};

export default HomePage;
