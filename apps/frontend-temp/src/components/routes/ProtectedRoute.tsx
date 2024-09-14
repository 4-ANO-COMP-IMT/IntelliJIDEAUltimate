// src/components/ProtectedRoute.tsx

import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAllowedRoles } from 'contexts/AllowedRolesContext';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { allowedRoles } = useAllowedRoles(); // Obtenha os papéis permitidos
  const location = useLocation();

  // Caso o usuário não esteja autenticado, redirecione para a página de login com a rota atual como parâmetro
  if (!isAuthenticated) {
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/sign-in?redirect=${redirectTo}`} replace />;
  }

  // Verifica se o papel do usuário está entre os papéis permitidos para acessar a rota
  if (user?.role && !allowedRoles.includes(user.role)) {
    console.log('User does not have the required role, redirecting to forbidden, user:', user);
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>; // Se tudo estiver correto, renderiza os filhos
};

export default ProtectedRoute;
