// src/components/Sidebar.tsx

import React from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import routes from '../../config/routes'; // Importa as rotas
import { useAuth } from '../../contexts/AuthContext'; // Usa o hook de autenticação
import { useAllowedRoles } from 'contexts/AllowedRolesContext';

interface SidebarProps {
  show: boolean;
  handleClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ show, handleClose }) => {
  const { user } = useAuth(); // Obtém o usuário autenticado do contexto
  const { allowedRoles } = useAllowedRoles(); // Obtém os papéis permitidos do contexto

  if (!user) {
    return null; // Se não houver usuário autenticado, não renderiza a sidebar
  }
  console.log(user.role);
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Sidebar</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-0">
        <Nav className="flex-column bg-dark h-100 p-3">
          {/* Exibe apenas as rotas que o usuário tem permissão para acessar */}
          {routes
            .filter(route => route.showInSidebar && route.roles.includes(user.role))
            .map((route, idx) => (
              <Nav.Link href={route.path} className="text-white" key={idx}>
                {route.name}
              </Nav.Link>
            ))}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
