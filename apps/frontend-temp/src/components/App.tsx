// src/App.tsx

import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import ClassificationPage from './pages/ClassificationPage';
import HomePage from './pages/HomePage';
import AdminRegisterPage from "./pages/AdminRegisterPage";
import WelcomePage from "./pages/WelcomePage";
import ValidationPage from "./pages/ValidationPage";
import ImageUploadPage from "./pages/ImageUploadPage";
import ProtectedRoute from './routes/ProtectedRoute'; // Importa o ProtectedRoute
import PageLayout from './layouts/PageLayout'; // Importa o PageLayout

// Rotas principais e aninhadas com proteção
const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />, // O layout com o Header
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'welcome',
        element: <ProtectedRoute reason="Você precisa estar logado para acessar esta página." />,
        children: [
          {
            path: '',
            element: <WelcomePage />,
          },
        ],
      },
      {
        path: 'classification',
        element: <ProtectedRoute reason="Você precisa estar logado para classificar imagens." />,
        children: [
          {
            path: '',
            element: <ClassificationPage />,
          },
        ],
      },
      {
        path: 'admin-register',
        element: <ProtectedRoute reason="Você precisa estar logado como administrador para registrar usuários." />,
        children: [
          {
            path: '',
            element: <AdminRegisterPage />,
          },
        ],
      },
      {
        path: 'validation',
        element: <ProtectedRoute reason="Você precisa estar logado como administrador para validar imagens." />,
        children: [
          {
            path: '',
            element: <ValidationPage />,
          },
        ],
      },
      {
        path: 'image-upload',
        element: <ProtectedRoute reason="Você precisa estar logado para fazer upload de imagens." />,
        children: [
          {
            path: '',
            element: <ImageUploadPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignInPage />, // A página de login não terá o Header
  },
]);

// Função principal do app com tipagem
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
