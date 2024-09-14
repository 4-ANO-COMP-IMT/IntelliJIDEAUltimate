// src/layouts/PageLayout.tsx
import React, { PropsWithChildren } from 'react';
import Header from '../Header/Header';  // Importa o seu componente Header
import { Container, Row, Col } from 'react-bootstrap';  // Importa os componentes necessários do react-bootstrap

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main> {/* Renderiza o conteúdo das rotas */}
      <Container fluid style={{ backgroundColor: '#f8f9fa', padding: '20px 0', color: '#6c757d' }}>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <p>Access the project repository on <a href="https://github.com/4-ANO-COMP-IMT/IntelliJIDEAUltimate" style={{ color: '#0275d8' }}>GitHub</a></p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageLayout;
