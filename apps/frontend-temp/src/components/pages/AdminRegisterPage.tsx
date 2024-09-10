// src/components/AdminRegisterUserPage.tsx

import React, { useState } from 'react';
import { Form, Button, Spinner, Container } from 'react-bootstrap';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterFormValues {
  username: string;
  password: string;
  role: 'user' | 'admin'; // O papel do usuário, pode ser 'user' ou 'admin'
}

interface RegisterResponse {
  message: string;
}

const registerUser = async (credentials: RegisterFormValues): Promise<RegisterResponse> => {
  const response = await axios.post('http://localhost:3000/api/register/', credentials);
  return response.data; // Supondo que o servidor retorna { message: '...' }
};

const AdminRegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const navigate = useNavigate();

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      alert(data.message); // Mostra mensagem de sucesso
      navigate('/admin'); // Redireciona para a página de administração
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
    mutation.mutate({ username, password, role });
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
