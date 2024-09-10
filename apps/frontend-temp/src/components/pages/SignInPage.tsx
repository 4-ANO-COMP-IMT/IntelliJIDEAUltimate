// src/components/SignInPage.tsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Container, Row, Col, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  session_token?: string;
  role?: 'admin' | 'user'; // Hardcoded role for demonstration
}

const loginUser = async (credentials: LoginFormValues): Promise<LoginResponse> => {
  // Simula um login com dados hardcoded
  if (credentials.username === 'admin' && credentials.password === 'admin123') {
    return {
      message: 'Login successful',
      session_token: 'admin_token_123',
      role: 'admin',
    };
  } else if (credentials.username === 'user' && credentials.password === 'user123') {
    return {
      message: 'Login successful',
      session_token: 'user_token_123',
      role: 'user',
    };
  } else {
    throw new AxiosError('Credenciais inválidas');
  }
};

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showTempButtons, setShowTempButtons] = useState(true); // Controle para exibir ou ocultar os botões temporários
  const [notification, setNotification] = useState<string | null>(null); // Notificação de redirecionamento
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Checa se há uma razão para redirecionamento no query string
    const queryParams = new URLSearchParams(location.search);
    const reason = queryParams.get('reason');
    if (reason) {
      setNotification(reason); // Define a notificação de redirecionamento
    }
  }, [location.search]);

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      if (data.session_token) {
        // Armazena o token e o papel (role) no cookie
        Cookies.set('session_token', data.session_token, { expires: 1 });
        Cookies.set('user_role', data.role || 'user', { expires: 1 }); // Armazena o papel no cookie

        // Redireciona para a página de boas-vindas
        navigate('/welcome');
      }
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const serverError = error.response.data as LoginResponse;
        alert(serverError.message); // Mostra a mensagem de erro específica
      } else {
        alert('Ocorreu um erro ao tentar fazer login.');
      }
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit} className="w-50">
        <h3 className="text-center mb-4">Login</h3>

        {/* Exibe a notificação de redirecionamento, se houver */}
        {notification && (
          <Alert variant="warning" className="text-center">
            {notification}
          </Alert>
        )}

        {/* Botões temporários de login rápido */}
        {showTempButtons && (
          <Alert variant="warning" onClose={() => setShowTempButtons(false)} dismissible>
            <Row>
              <Col>
                <Button
                  variant="danger"
                  className="w-100 mb-2"
                  onClick={() => mutation.mutate({ username: 'admin', password: 'admin123' })}
                  style={{ fontWeight: 'bold' }}
                >
                  Login como Administrador (Admin)
                </Button>
              </Col>
              <Col>
                <Button
                  variant="success"
                  className="w-100 mb-2"
                  onClick={() => mutation.mutate({ username: 'user', password: 'user123' })}
                  style={{ fontWeight: 'bold' }}
                >
                  Login como Usuário Normal
                </Button>
              </Col>
            </Row>
          </Alert>
        )}

        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-4" disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <>
              <FaSignInAlt /> Login
            </>
          )}
        </Button>
      </Form>
    </Container>
  );
};

const SignInPage: React.FC = () => {
  return <SignIn />;
}

export default SignInPage;
