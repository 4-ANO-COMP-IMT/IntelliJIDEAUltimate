// src/components/Login.tsx

import React, { useState } from 'react';
import { Form, Button, Spinner, Container } from 'react-bootstrap';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  session_token?: string; // O token só existe na resposta de sucesso
}

const loginUser = async (credentials: LoginFormValues): Promise<LoginResponse> => {
  const response = await axios.post('http://localhost:3000/api/login/', credentials);
  return response.data; // Supondo que o servidor retorna { message: '...', session_token: '...' }
};

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      if (data.session_token) {
        Cookies.set('session_token', data.session_token, { expires: 1 }); // Armazena o token no cookie por 1 dia
        navigate('/classificate');
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

export default Login;
