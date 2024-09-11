// src/components/ProtectedRoute.tsx

import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Usa o contexto de autenticação
import { useAllowedRoles } from 'contexts/AllowedRolesContext';


const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const {allowedRoles} = useAllowedRoles();
  const { user, isAuthenticated } = useAuth(); // Obtém o usuário e o estado de autenticação do contexto
 
  if ( !isAuthenticated ){
    console.log('Not authenticated, redirecting to sign-in, user:', user);

    return <Navigate to="/sign-in" />; // Redireciona para a página de login

  }
  if ( user?.role && !allowedRoles.includes(user.role) ) {
    console.log('User does not have the required role, redirecting to forbidden, user:', user);
    return <Navigate to="/forbidden" />; // Redireciona para a página de "Acesso Negado"
  }

  return <>{children}</>
};

export default ProtectedRoute;
