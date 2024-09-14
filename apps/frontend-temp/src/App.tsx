// src/App.tsx

import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import routes from './config/routes'; // Importa as rotas
import ProtectedRoute from './components/routes/ProtectedRoute'; // Componente que protege as rotas
import PageLayout from './components/layouts/PageLayout'; // Layout principal
import { AuthProvider } from './contexts/AuthContext';
import { AllowedRolesProvider } from './contexts/AllowedRolesContext'; // Para encapsular com roles

// Função para encapsular a rota com ProtectedRoute e AllowedRolesProvider dinamicamente
const withRoleProtection = (component: React.ReactNode, roles: ("admin" | "user")[]) => {
  return (
    <AllowedRolesProvider roles={roles}>
      <PageLayout>
        <ProtectedRoute>
          {component}
        </ProtectedRoute>
      </PageLayout>
    </AllowedRolesProvider>
  );
};

// Cria o roteador dinâmico com base nas rotas definidas no routes.ts
let new_routes: RouteObject[] = routes.map(route => {
  const element = route.roles.length > 0
    ? withRoleProtection(route.component, route.roles) // Se houver roles, protege a rota
    : route.component; // Se não houver roles, renderiza o componente normalmente

  return {
    path: route.path,
    element,
  };
});

const router = createBrowserRouter(new_routes);

const App: React.FC = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
