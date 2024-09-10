// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  reason: string; // A razão pela qual o usuário foi redirecionado
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ reason }) => {
  const sessionToken = Cookies.get('session_token');

  // Se o usuário não tiver um token, redireciona para a página de login
  if (!sessionToken) {
    return <Navigate to={`/sign-in?reason=${encodeURIComponent(reason)}`} />;
  }

  // Se o usuário tiver o token, renderiza o componente da rota
  return <Outlet />;
};

export default ProtectedRoute;
