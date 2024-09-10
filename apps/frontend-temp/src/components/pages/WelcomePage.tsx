// src/components/WelcomePage.tsx

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import RoleButton from '../welcome/RoleButton';  // Importa o RoleButton

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

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Welcome</h1>

      {/* Primeira linha: Classificar e Registrar */}
      <Row className="text-center w-50 mb-3">
        <Col>
          <RoleButton role={role} allowedRoles={['admin', 'user']} onClick={() => navigate('/classification')}>
            Classificar
          </RoleButton>
        </Col>

        <Col>
          <RoleButton role={role} allowedRoles={['admin']} onClick={() => navigate('/admin-register')}>
            Registrar
          </RoleButton>
        </Col>
      </Row>

      {/* Segunda linha: Validar e Upload */}
      <Row className="text-center w-50">
        <Col>
          <RoleButton role={role} allowedRoles={['admin']} onClick={() => navigate('/validation')}>
            Validar
          </RoleButton>
        </Col>

        <Col>
          <RoleButton role={role} allowedRoles={['admin']} onClick={() => navigate('/image-upload')}>
            Upload
          </RoleButton>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;
