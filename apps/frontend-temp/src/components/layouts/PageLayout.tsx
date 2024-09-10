// src/layouts/PageLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';  // Importa o seu componente Header

const PageLayout: React.FC = () => {
  return (
    <div>
      <Header /> {/* O header será exibido em todas as páginas */}
      <div className="content">
        <Outlet /> {/* O conteúdo da rota específica será exibido aqui */}
      </div>
    </div>
  );
};

export default PageLayout;
