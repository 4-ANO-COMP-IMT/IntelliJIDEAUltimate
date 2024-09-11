// src/layouts/PageLayout.tsx

import React, { PropsWithChildren } from 'react';
import Header from '../Header/Header';  // Importa o seu componente Header

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header/>
      <main>{children}</main> {/* Renderiza o conteúdo das rotas */}
      <footer>/* Coloque seu Footer aqui, se necessário */</footer>
    </div>
  );
};

export default PageLayout;

