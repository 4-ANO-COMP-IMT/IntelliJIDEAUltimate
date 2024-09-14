// src/components/AdminRegisterUserPage.tsx

import React, { useState } from 'react';
import { Form, Button, Spinner, Container } from 'react-bootstrap';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth, User } from 'contexts/AuthContext';

interface RegisterFormValues {
  username: string;
  password: string;
  role: 'user' | 'admin'; // O papel do usuário, pode ser 'user' ou 'admin'
  session_token: string;
}

interface RegisterResponse {
  message: string;
}

const registerUser = async (credentials: RegisterFormValues): Promise<RegisterResponse> => {
  const req_body = {
    "new_username": credentials.username,
    "new_password": credentials.password,
    "is_admin": credentials.role === 'admin'
  }
  console.log(req_body);
  const headers = {
    headers: {
      'Authorization': `Bearer ${credentials.session_token}`
    }
  }

  const response = await axios.post('http://localhost:3001/register', req_body, headers);
  return response.data; // Supondo que o servidor retorna { message: '...' }
};

const AdminRegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const navigate = useNavigate();

  const { user } = useAuth();

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      alert(data.message); // Mostra mensagem de sucesso
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const serverError = error.response.data as RegisterResponse;
        alert(serverError.message); // Mostra a mensagem de erro específica
      } else {
        alert('Ocorreu um erro ao tentar registrar o usuário.');
      }
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({ username, password, role, session_token: user!.session_token });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit} className="w-50">
        <h3 className="text-center mb-4">Registrar Novo Usuário</h3>
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

        <Form.Group controlId="formRole" className="mt-3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value as 'user' | 'admin')}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-4" disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            'Registrar Usuário'
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default AdminRegisterPage;
