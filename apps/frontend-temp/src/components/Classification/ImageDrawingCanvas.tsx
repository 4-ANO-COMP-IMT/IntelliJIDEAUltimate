import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { useAppContext } from './AppContext';
import { useToolContext } from './ToolContext';
import PopupMenu from './PopupMenu'; 
import FinalizedRectangle from './FinalizedRectangle';

const ImageDrawingCanvas: React.FC = () => {
  const { is_loading, is_sending, image_url, addRectangle, rectangles, image_width, image_height } = useAppContext();
  const { selectedTool } = useToolContext();
  const [image] = useImage(image_url || 'http://localhost:3010/icons/LoadingImage.png');
  const [newRect, setNewRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [stageSize, setStageSize] = useState<{ width: number; height: number }>({ width: 800, height: 600 });
  const [scale, setScale] = useState(1); // Escala aplicada à imagem e aos retângulos
  const { loadNextImage, setImageDimensions } = useAppContext();

  useEffect(() => {
    loadNextImage();
  }, []);

  useEffect(() => {
    if (image) {
      // Definir as dimensões originais da imagem no contexto
      setImageDimensions(image.width, image.height);

      // Tamanho máximo do canvas
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 600;

      // Calcula a escala para ajustar a imagem dentro do canvas sem cortar
      const scaleX = MAX_WIDTH / image.width;
      const scaleY = MAX_HEIGHT / image.height;
      const newScale = Math.min(scaleX, scaleY);

      // Calcula o tamanho do stage com base na escala
      const scaledWidth = image.width * newScale;
      const scaledHeight = image.height * newScale;

      setStageSize({ width: scaledWidth, height: scaledHeight });
      setScale(newScale);
    }
  }, [image]);

  const handleMouseDown = (e: any) => {
    if (is_loading || is_sending || drawing || selectedTool !== 'draw') return;
    const pos = e.target.getStage().getPointerPosition();
    setNewRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
    setDrawing(true);
  };

  const handleMouseMove = (e: any) => {
    if (!drawing || !newRect || selectedTool !== 'draw') return;
    const pos = e.target.getStage().getPointerPosition();
    setNewRect((prevRect) => ({
      x: prevRect!.x,
      y: prevRect!.y,
      width: pos.x - prevRect!.x,
      height: pos.y - prevRect!.y,
    }));
  };

  const handleMouseUp = (e: any) => {
    if (!drawing || selectedTool !== 'draw') return;
    setDrawing(false);
    if (newRect) {
      const pos = e.target.getStage().getPointerPosition();
      setPopupPosition({ x: pos.x, y: pos.y });
    }
  };

  const handleConfirmRectangle = (class_id: number) => {
    if (newRect && image_width && image_height) {
      // Converter as coordenadas para valores normalizados entre 0 e 1
      const normalizedRect = {
        x: (newRect.x + newRect.width / 2) / (stageSize.width), // Centro X
        y: (newRect.y + newRect.height / 2) / (stageSize.height), // Centro Y
        width: Math.abs(newRect.width) / (stageSize.width),
        height: Math.abs(newRect.height) / (stageSize.height),
        class_id,
      };
      addRectangle(normalizedRect);
      setNewRect(null);
      setPopupPosition(null);
    }
  };

  const borderThickness = 2; // Espessura da borda em pixels

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div
        className="canvas-container"
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
        }}
      >
        {/* Contêiner para a borda */}
        <div
          style={{
            border: `${borderThickness}px solid #007bff`,
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: `${stageSize.width + 2 * borderThickness}px`, // Aumenta o contêiner para incluir a borda
            height: `${stageSize.height + 2 * borderThickness}px`, // Aumenta o contêiner para incluir a borda
            boxSizing: 'content-box', // A borda não entra no tamanho total do canvas
            backgroundColor: '#f8f9fa',
          }}
        >
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              cursor: is_loading || is_sending ? 'not-allowed' : selectedTool === 'draw' ? 'crosshair' : 'default',
            }}
          >
            <Layer>
              {/* Renderizar a imagem de fundo */}
              {image && (
                <KonvaImage
                  image={image}
                  width={stageSize.width}
                  height={stageSize.height}
                />
              )}

              {/* Renderizar retângulos finalizados */}
              {rectangles.map((rect, index) => (
                <FinalizedRectangle
                  key={index}
                  x={rect.x * stageSize.width - (rect.width * stageSize.width) / 2}
                  y={rect.y * stageSize.height - (rect.height * stageSize.height) / 2}
                  width={rect.width * stageSize.width}
                  height={rect.height * stageSize.height}
                  class_id={rect.class_id}
                  index={index}
                />
              ))}

              {/* Renderizar o novo retângulo enquanto está sendo desenhado */}
              {newRect && (
                <Rect
                  x={newRect.x}
                  y={newRect.y}
                  width={newRect.width}
                  height={newRect.height}
                  stroke="red"
                  strokeWidth={2}
                  dash={[10, 5]}
                />
              )}
            </Layer>
          </Stage>

          {/* Renderizar o popup se um retângulo foi desenhado */}
          {popupPosition && (
            <PopupMenu x={popupPosition.x} y={popupPosition.y} onConfirm={handleConfirmRectangle} />
          )}

          {/* Overlay quando está carregando ou enviando */}
          {(is_loading || is_sending) && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${stageSize.width + 2 * borderThickness}px`,
                height: `${stageSize.height + 2 * borderThickness}px`,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
              }}
            >
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ImageDrawingCanvas;
