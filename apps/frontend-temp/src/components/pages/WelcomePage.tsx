// src/components/WelcomePage.tsx

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Usa o hook de autenticação
import routes from '../../config/routes'; // Importa as rotas
import { useAllowedRoles } from 'contexts/AllowedRolesContext';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Usa o contexto de autenticação para acessar o usuário
  const { allowedRoles } = useAllowedRoles();


  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Bem-vindo, {user!.username}!</h1>

      {/* Exibe apenas as rotas que o usuário tem permissão para acessar */}
      {routes
        .filter(route => route.showInWelcomePage && route.roles.includes(user!.role))
        .map((route, idx) => (
          <Row className="text-center w-50 mb-3" key={idx}>
            <Col>
              <button onClick={() => route.name == 'Classificar' ? window.location.href = 'http://localhost:59963' : navigate(route.path) }>{route.name}</button>
            </Col>
          </Row>
        ))}
    </Container>
  );
};

export default WelcomePage;
