// src/components/WelcomePage.tsx

import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'admin' | 'user' | null>(null); // Estado para armazenar o papel do usuário

  useEffect(() => {
    // Verifica o token e obtém o papel do usuário
    const sessionToken = Cookies.get('session_token');
    const userRole = Cookies.get('user_role');

    if (!sessionToken) {
      navigate('/sign-in'); // Se não houver token, redireciona para o login
    } else if (userRole) {
      setRole(userRole as 'admin' | 'user'); // Define o papel do usuário
    }
  }, [navigate]);

  const handleClassify = () => {
    navigate('/classification'); // Redireciona para a página de classificação
  };

  const handleRegisterUser = () => {
    navigate('/admin-register'); // Redireciona para a página de registrar usuários (somente admins)
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Bem-vindo(a) ao Sistema de Classificação de Imagens</h1>
      <p className="lead mb-5">Escolha o que deseja fazer a seguir:</p>

      {role === 'admin' ? (
        <Row className="w-50">
          <Col className="mb-3">
            <Button variant="primary" size="lg" onClick={handleClassify} className="w-100">
              Classificar Imagens
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" size="lg" onClick={handleRegisterUser} className="w-100">
              Registrar Novo Usuário
            </Button>
          </Col>
        </Row>
      ) : role === 'user' ? (
        <Button variant="primary" size="lg" onClick={handleClassify}>
          Classificar Imagens
        </Button>
      ) : (
        <p>Carregando permissões...</p> // Exibe enquanto a role está sendo verificada
      )}
    </Container>
  );
};

export default WelcomePage;
