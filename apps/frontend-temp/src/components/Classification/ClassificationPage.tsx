import React from 'react';
import { AppProvider } from './AppContext';
import ClassificationTool from './ClassificationTool';
import ImageDrawingCanvas from './ImageDrawingCanvas';
import { ToolProvider } from './ToolContext';
import { Container } from 'react-bootstrap';

const ClassificationPage: React.FC = () => {
  return (
    <AppProvider>
      <ToolProvider>
        <Container fluid>
          <ClassificationTool />
          <ImageDrawingCanvas />
        </Container>
      </ToolProvider>
    </AppProvider>
  );
};

export default ClassificationPage;
