import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Container, Spinner } from 'react-bootstrap';
import CardComponent, { CardInfo } from './components/CardComponent';
import { Size } from 'react-virtualized';
import { useQuery } from '../../contexts/QueryContext';

const GridComponent: React.FC = () => {
  const { images, isLoading } = useQuery(); // Pega os dados e o estado de carregamento do contexto

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <span className="sr-only">Carregando...</span>
        <Spinner animation="border" role="status">
          
        </Spinner>
      </div>
    );
  }

  const columnCount = 4; // Definimos o número de colunas

  return (
    <Container fluid style={{ height: '100vh' }}>
      <AutoSizer>
        {({ width, height }: Size) => {
          const gap = 20;
          const totalWidth = width - gap * (columnCount - 1);
          const columnWidth = totalWidth / columnCount;
          const rowHeight = columnWidth * 1.2;

          return (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={Math.ceil(images.length / columnCount)}
              rowHeight={rowHeight + gap}
              width={width}
              overscanRowCount={1}
              overscanColumnCount={1}
              style={{
                padding: `${gap}px`,
                border: '2px solid #ccc',
                borderRadius: '10px',
                boxSizing: 'border-box',
                overflowX: 'hidden',
              }}
            >
              {({ columnIndex, rowIndex, style }) => {
                const itemIndex = rowIndex * columnCount + columnIndex;
                const item = images[itemIndex];

                return (
                  <div style={{ ...style, padding: '10px' }}>
                    {item && <CardComponent item={item} x={columnIndex} y={rowIndex} />}
                  </div>
                );
              }}
            </Grid>
          );
        }}
      </AutoSizer>
    </Container>
  );
};

export default GridComponent;
