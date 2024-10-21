// src/components/ProtectedRoute.tsx

import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAllowedRoles } from 'contexts/AllowedRolesContext';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { allowedRoles } = useAllowedRoles();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redireciona para login, mantendo a rota de onde o usuário veio
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/sign-in?redirect=${redirectTo}`} replace />;
  }

  if (user?.role && !allowedRoles.includes(user.role)) {
    // Verifica se o usuário já está em "/forbidden" para evitar loops
    if (location.pathname !== '/forbidden') {
      return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
