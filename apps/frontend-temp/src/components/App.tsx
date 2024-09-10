import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import ClassificationPage from './pages/ClassificationPage';
import HomePage from './pages/HomePage';
import AdminRegisterPage from "./pages/AdminRegisterPage";

import Header from "./Header/Header";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import WelcomePage from "./pages/WelcomePage";
import PageLayout from "./layouts/PageLayout";


// Rotas principais e aninhadas com tipagem
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,  // Rota principal
  },
  {
    path: '/sign-in',
    element: <SignInPage />, // Página de login
  },
  {
	path: '/classification',
    element: <ClassificationPage />, // Página de login
  },
  {
	path: '/admin-register',
	element: <AdminRegisterPage />
  },
  {
    path: '/welcome',
    element: <WelcomePage />
    },
    
]);



// Função principal do app com tipagem
const App: React.FC = () => {
	return <RouterProvider router={router} />;
};


export default App;