// src/components/AdminRegisterUserPage.tsx

import React, { useState } from 'react';
import { Form, Button, Spinner, Container, ListGroup, Card, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth, User as AuthUser } from 'contexts/AuthContext';

interface RegisterFormValues {
  username: string;
  password: string;
  role: 'user' | 'admin';
  session_token: string;
}

interface User {
  id: number;
  username: string;
  role: 'user' | 'admin';
}

interface Group {
  id: number;
  name: string;
}

const fetchUsers = async (session_token: string) => {
  const response = await axios.get('http://localhost:3001/users', {
    headers: { 'Authorization': `Bearer ${session_token}` }
  });
  return response.data;
};

const fetchGroups = async (session_token: string) => {
  const response = await axios.get('http://localhost:3001/groups', {
    headers: { 'Authorization': `Bearer ${session_token}` }
  });
  return response.data;
};

const registerUser = async (credentials: RegisterFormValues): Promise<void> => {
  const req_body = {
    new_username: credentials.username,
    new_password: credentials.password,
    is_admin: credentials.role === 'admin',
  };
  await axios.post('http://localhost:3001/register', req_body, {
    headers: {
      Authorization: `Bearer ${credentials.session_token}`,
    },
  });
};

const AdminRegisterPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const { user } = useAuth() as { user: AuthUser };
  const navigate = useNavigate();

  const { data: users, refetch: refetchUsers } = useQuery(['users', user.session_token], () =>
    fetchUsers(user.session_token)
  );
  const { data: groups, refetch: refetchGroups } = useQuery(['groups', user.session_token], () =>
    fetchGroups(user.session_token)
  );

  const mutation = useMutation(registerUser, {
    onSuccess: () => {
      refetchUsers(); 
    },
    onError: (error: AxiosError) => {
      alert('Error registering user');
    },
  });

  const handleUserSelect = (selectedUser: User) => {
    setSelectedUser(selectedUser);
    setUsername(selectedUser.username);
    setRole(selectedUser.role);
  };

  const handleGroupAssign = async () => {
    if (selectedUser && selectedGroup) {
      await axios.post(
        'http://localhost:3001/users/add-to-group',
        {
          userId: selectedUser.id,
          groupId: selectedGroup,
        },
        {
          headers: { Authorization: `Bearer ${user.session_token}` },
        }
      );
      alert('User added to group');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({ username, password, role, session_token: user.session_token });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="w-100">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">{selectedUser ? 'Editar Usuário' : 'Registrar Novo Usuário'}</h3>

            <Row>
              <Col md={6}>
                <ListGroup className="mb-3">
                  {users?.map((u: User) => (
                    <ListGroup.Item key={u.id} onClick={() => handleUserSelect(u)}>
                      {u.username}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formRole" className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select value={role} onChange={(e) => setRole(e.target.value as 'user' | 'admin')}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formGroup" className="mb-3">
                  <Form.Label>Assign to Group</Form.Label>
                  <Form.Select value={selectedGroup || ''} onChange={(e) => setSelectedGroup(Number(e.target.value))}>
                    <option value="">Select a group</option>
                    {groups?.map((g: Group) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Button variant="secondary" className="mt-2" onClick={handleGroupAssign}>Add to Group</Button>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  {mutation.isLoading ? <Spinner animation="border" size="sm" /> : selectedUser ? 'Save Changes' : 'Register User'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminRegisterPage;
