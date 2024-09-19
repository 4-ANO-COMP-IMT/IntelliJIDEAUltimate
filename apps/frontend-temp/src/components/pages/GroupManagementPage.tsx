// src/components/GroupManagementPage.tsx

import React, { useState } from 'react';
import { Form, Button, Container, ListGroup, Card, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { useAuth } from 'contexts/AuthContext';

interface Group {
  id: number;
  name: string;
}

interface User {
  id: number;
  username: string;
}

const fetchGroups = async (session_token: string) => {
  const response = await axios.get('http://localhost:3001/groups', {
    headers: { 'Authorization': `Bearer ${session_token}` }
  });
  return response.data;
};

const fetchUsers = async (session_token: string) => {
  const response = await axios.get('http://localhost:3001/users', {
    headers: { 'Authorization': `Bearer ${session_token}` }
  });
  return response.data;
};

const GroupManagementPage: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const { user } = useAuth();

  const { data: groups, refetch: refetchGroups } = useQuery(['groups', user!.session_token], () => fetchGroups(user!.session_token));
  const { data: users, refetch: refetchUsers } = useQuery(['users', user!.session_token], () => fetchUsers(user!.session_token));

  const mutationCreateGroup = useMutation(async (groupName: string) => {
    await axios.post('http://localhost:3001/groups', { name: groupName }, {
      headers: { 'Authorization': `Bearer ${user!.session_token}` }
    });
    refetchGroups();
  });

  const handleGroupCreate = (e: React.FormEvent) => {
    e.preventDefault();
    mutationCreateGroup.mutate(groupName);
    setGroupName(''); 
  };

  const handleAddUserToGroup = async () => {
    if (selectedGroup && selectedUser) {
      await axios.post(`http://localhost:3001/groups/${selectedGroup.id}/add-user`, { userId: selectedUser }, {
        headers: { 'Authorization': `Bearer ${user!.session_token}` }
      });
      alert('User added to group');
    }
  };

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <h3>Group Management</h3>
          <Form onSubmit={handleGroupCreate}>
            <Form.Group>
              <Form.Label>Create New Group</Form.Label>
              <Form.Control
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
                required
              />
            </Form.Group>
            <Button type="submit" className="mt-3" variant="primary">Create Group</Button>
          </Form>
        </Card.Body>
      </Card>

      <Row className="mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4>Existing Groups</h4>
              <ListGroup>
                {groups?.map((g: Group) => (
                  <ListGroup.Item key={g.id} onClick={() => setSelectedGroup(g)}>
                    {g.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          {selectedGroup && (
            <Card>
              <Card.Body>
                <h5>Editing Group: {selectedGroup.name}</h5>
                <Form.Group>
                  <Form.Label>Add User to Group</Form.Label>
                  <Form.Select value={selectedUser || ''} onChange={(e) => setSelectedUser(Number(e.target.value))}>
                    <option value="">Select a user</option>
                    {users?.map((u: User) => (
                      <option key={u.id} value={u.id}>{u.username}</option>
                    ))}
                  </Form.Select>
                  <Button className="mt-2" variant="secondary" onClick={handleAddUserToGroup}>Add User</Button>
                </Form.Group>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GroupManagementPage;
