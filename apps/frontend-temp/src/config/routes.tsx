// src/config/routes.ts

import WelcomePage from "components/pages/WelcomePage";
import AdminRegisterPage from "components/pages/AdminRegisterPage";
import ClassificationPage from "components/pages/ClassificationPage";
import ValidationPage from "components/pages/ValidationPage";
import ImageUploadPage from "components/pages/ImageUploadPage";
import SignInPage from "components/pages/SignInPage";
import HomePage from "components/pages/HomePage";
import React, { ReactNode } from "react";
import NewValidationPage from "components/validation/new/pages/NewValidationPage";

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
    path: '/admin-register',
    name: 'Registrar Usuários',
    component: <AdminRegisterPage />,
    roles: ['admin'], // Protegida por roles
    showInWelcomePage: true, // Reintroduzido
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
    component: <div>Você não tem permissão para acessar esta página, contate um Administrador</div>,
    roles: ["user"], // Sem proteção
    showInWelcomePage: false, // Reintroduzido
    showInSidebar: false,
  }
];

export default routes;



// // src/config/routes.ts

// import PageLayout from "components/layouts/PageLayout";
// import AdminRegisterPage from "components/pages/AdminRegisterPage";
// import ClassificationPage from "components/pages/ClassificationPage";
// import HomePage from "components/pages/HomePage";
// import ImageUploadPage from "components/pages/ImageUploadPage";
// import SignInPage from "components/pages/SignInPage";
// import ValidationPage from "components/pages/ValidationPage";
// import WelcomePage from "components/pages/WelcomePage";
// import ProtectedRoute from "components/routes/ProtectedRoute";
// import { AllowedRolesContext, AllowedRolesProvider } from "contexts/AllowedRolesContext";
// import React, { ReactNode } from "react";

// export interface RouteConfig {
//   path: string;
//   name: string;
//   component: ReactNode; // Componente da página
//   // allowedRoles: ('admin' | 'user')[];
//   showInSidebar?: boolean;
//   showInWelcomePage?: boolean;
// }

// /***

//      Se a rota usar o layout, envolve o componente no layout e no ProtectedRoute
//       <PageLayout>
//         <ProtectedRoute allowedRoles={route.allowedRoles}>
//           <route.component /> 
//           </ProtectedRoute>
//           </PageLayout>
//         ) : (
//           // Se a rota não usar layout, apenas aplica o ProtectedRoute
//           <ProtectedRoute allowedRoles={route.allowedRoles}>
//             <route.component /> 
//           </ProtectedRoute>
//         ),
// */

// const routes: RouteConfig[] = [
//   {
//     path: '/welcome',
//     name: 'Bem-vindo',
//     // component: <WelcomePage />,
//     // allowedRoles: ['admin', 'user'],
//     component: 
//     <AllowedRolesProvider roles={['admin', 'user']}>
//       <PageLayout>
//         <ProtectedRoute >
//           <WelcomePage /> 
//         </ProtectedRoute>
//       </PageLayout>
//     </AllowedRolesProvider>,
//     showInWelcomePage: false,
//     showInSidebar: true,
//   },
//   {
//     path: '/classification',
//     name: 'Classificar',
//     // component: <ClassificationPage />,
//     component: 

//     <AllowedRolesProvider roles={['admin', 'user']}>
//       <PageLayout>
//         <ProtectedRoute >
//           <ClassificationPage /> 
//         </ProtectedRoute>
//       </PageLayout>
//     </AllowedRolesProvider>
      
//     ,
//     showInWelcomePage: true,
//     showInSidebar: true,
//   },
//   {
//     path: '/admin-register',
//     name: 'Registrar Usuários',
//     //component: AdminRegisterPage,
//     // component: <AdminRegisterPage />,
//     // allowedRoles: ['admin'],
//     component:
//     <AllowedRolesProvider roles={['admin']}>
//       <PageLayout>
//         <ProtectedRoute >
//           <AdminRegisterPage /> 
//         </ProtectedRoute>
//       </PageLayout>
//     </AllowedRolesProvider>,
//     showInWelcomePage: true,
//     showInSidebar: true,
//   },
//   {
//     path: '/validation',
//     name: 'Validar Imagens',
//     // component: ValidationPage,
//     // component: <ValidationPage />,
//     // allowedRoles: ['admin'],
//     component:
//     <AllowedRolesProvider roles={['admin']}>
//       <PageLayout>
//         <ProtectedRoute >
//           <ValidationPage /> 
//         </ProtectedRoute>
//       </PageLayout>
//     </AllowedRolesProvider>,
//     showInWelcomePage: true,
//     showInSidebar: true,
//   },
//   {
//     path: '/image-upload',
//     name: 'Upload de Imagens',
//     // component: ImageUploadPage,
//     // component: <ImageUploadPage />,
//     // allowedRoles: ['admin'],
//     component:
//     <AllowedRolesProvider roles={['admin']}>
//       <PageLayout>
//         <ProtectedRoute >
//           <ImageUploadPage /> 
//         </ProtectedRoute>
//       </PageLayout>
//     </AllowedRolesProvider>,
//     showInWelcomePage: true,
//     showInSidebar: true,
//   },
//   {
//     path: '/forbidden',
//     name: 'Acesso Negado',
//     // component: () => <div>Você não tem permissão para acessar esta página</div>,
//     // component: <div>Você não tem permissão para acessar esta página</div>,
//     // allowedRoles: [], // Página acessível para exibição de erro
//     component: <div>Você não tem permissão para acessar esta página</div>,
//     showInWelcomePage: false,
//     showInSidebar: false,
//   },
//   {
//     path: '/sign-in',
//     name: 'Login',
//     // component: SignInPage,
//     // component: <SignInPage />,
//     // allowedRoles: [], // Qualquer um pode acessar
//     component: <SignInPage />,
//     showInWelcomePage: false,
//     showInSidebar: false,
//   },
//   {
//     path: '/',
//     name: 'Página Inicial',
//     // component: HomePage,
//     // component: <HomePage />,
//     // allowedRoles: [],
//     component: <HomePage />,
//     showInWelcomePage: false,
//     showInSidebar: false,
//   },
// ];

// export default routes;
