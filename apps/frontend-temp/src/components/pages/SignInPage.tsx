// src/components/SignInPage.tsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Container, Row, Col, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext'; // Importa o hook useAuth
import axios from 'axios';

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginResponse {
  username: string;
  message: string;
  session_token?: string;
  user_id?: string;
  role?: 'admin' | 'user';
}

const loginUser = async (credentials: LoginFormValues): Promise<LoginResponse> => {
  // Simula um login com dados hardcoded
  let response: {
    message: string,
    session_token: string
    user_id: number,
    role: 'admin' | 'user'
  };
  
  response = (await axios.post('http://localhost:30000/api/login', {
    "username": credentials.username,
    "password": credentials.password
  })).data;
  console.log(response);

    return {
      message: response.message,
      session_token: response.session_token,
      user_id: response.user_id.toString(),
      role: response.role,
      username: credentials.username,
    };
};

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showTempButtons, setShowTempButtons] = useState(true); // Controle para exibir ou ocultar os botões temporários
  const [notification, setNotification] = useState<string | null>(null); // Notificação de redirecionamento
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Usa o hook useAuth para obter a função login

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
      if (data.session_token && data.user_id && data.role) {
        // Chama o login do contexto de autenticação
        login({
          username: data.username,
          user_id: data.user_id,
          session_token: data.session_token,
          role: data.role,
        });

        // Redireciona para a página de boas-vindas
        navigate('/welcome');
      }
    },
    onError: () => {
      alert('Credenciais inválidas. Tente novamente.');
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

        {/* {//Botões temporários de login rápido}
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
        )} */}

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
};

export default SignInPage;
