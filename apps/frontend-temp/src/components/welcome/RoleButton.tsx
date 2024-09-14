// src/components/RoleButton.tsx

import React from 'react';
import { Button } from 'react-bootstrap';

interface RoleButtonProps {
  role: 'admin' | 'user' | null;
  allowedRoles: ('admin' | 'user')[];
  onClick: () => void;
  children: React.ReactNode;
}

const RoleButton: React.FC<RoleButtonProps> = ({ role, allowedRoles, onClick, children }) => {
  // Renderiza o botão apenas se o papel do usuário estiver na lista de papéis permitidos
  if (!allowedRoles.includes(role as 'admin' | 'user')) {
    return null;
  }

  return (
    <Button onClick={onClick} variant="primary" className="w-100 mb-3">
      {children}
    </Button>
  );
};

export default RoleButton;
