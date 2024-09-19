// src/config/routes.ts

import WelcomePage from "components/pages/WelcomePage";
import AdminRegisterPage from "components/pages/AdminRegisterPage";
import ValidationPage from "components/pages/ValidationPage";
import ImageUploadPage from "components/pages/ImageUploadPage";
import SignInPage from "components/pages/SignInPage";
import HomePage from "components/pages/HomePage";
import React, { ReactNode } from "react";
import NewValidationPage from "components/validation/new/pages/NewValidationPage";
import ClassificationPage from "components/Classification/ClassificationPage";
import ForbiddenPage from "components/pages/ForbiddenPage";
import GroupManagementPage from "components/pages/GroupManagementPage";

interface RouteConfig {
  path: string;
  name: string;
  component: ReactNode;
  roles: ("admin" | "user")[];
  showInSidebar: boolean;
  showInWelcomePage: boolean;
}

const routes: RouteConfig[] = [
  {
    path: '/welcome',
    name: 'Bem-vindo',
    component: <WelcomePage />,
    roles: ['admin', 'user'], // Protegida por roles
    showInWelcomePage: false, // Reintroduzido
    showInSidebar: true,
  },
  {
    path: '/classification',
    name: 'Classificar',
    component: <ClassificationPage />,
    roles: ['admin', 'user'], // Protegida por roles
    showInWelcomePage: true, // Reintroduzido
    showInSidebar: true,
  },
  {
    path: '/user-management',
    name: 'Gerenciamento de Usuários',
    component: <AdminRegisterPage />,
    roles: ['admin'], // Apenas admins podem acessar
    showInWelcomePage: false,
    showInSidebar: true,
  },
  {
    path: '/group-management',
    name: 'Gerenciamento de Grupos',
    component: <GroupManagementPage />,
    roles: ['admin'], // Apenas admins podem acessar
    showInWelcomePage: false,
    showInSidebar: true,
  },
  
  {
    path: '/validation',
    name: 'Validar Imagens',
    component: <NewValidationPage />,
    roles: ['admin'], // Protegida por roles
    showInWelcomePage: true, // Reintroduzido
    showInSidebar: true,
  },
  {
    path: '/image-upload',
    name: 'Upload de Imagens',
    component: <ImageUploadPage />,
    roles: ['admin'], // Protegida por roles
    showInWelcomePage: true, // Reintroduzido
    showInSidebar: true,
  },
  {
    path: '/sign-in',
    name: 'Login',
    component: <SignInPage />,
    roles: [], // Sem proteção, qualquer um pode acessar
    showInWelcomePage: false, // Reintroduzido
    showInSidebar: false,
  },
  {
    path: '/',
    name: 'Página Inicial',
    component: <HomePage />,
    roles: [], // Sem proteção
    showInWelcomePage: false, // Reintroduzido
    showInSidebar: false,
  },
  {
    path: '/forbidden',
    name: 'Acesso Negado',
    component: <ForbiddenPage />,
    roles: [], // Sem proteção
    showInWelcomePage: false, // Reintroduzido
    showInSidebar: false,
  }
];

export default routes;
