import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { useAppContext } from './AppContext';
import { useToolContext } from './ToolContext';
import PopupMenu from './PopupMenu'; 
import FinalizedRectangle from './FinalizedRectangle';

const ImageDrawingCanvas: React.FC = () => {
  const { is_loading, is_sending, image_url, addRectangle, rectangles } = useAppContext();
  const { selectedTool } = useToolContext();
  const [image] = useImage(image_url);
  const [newRect, setNewRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [stageSize, setStageSize] = useState<{ width: number; height: number }>({ width: 800, height: 600 });

  useEffect(() => {
    if (image) {
      setStageSize({ width: image.width, height: image.height });
    }
  }, [image]);

  const handleMouseDown = (e: any) => {
    if (is_loading || is_sending || drawing || selectedTool !== 'draw') return;
    const { x, y } = e.target.getStage().getPointerPosition();
    setNewRect({ x, y, width: 0, height: 0 });
    setDrawing(true);
  };

  const handleMouseMove = (e: any) => {
    if (!drawing || !newRect || selectedTool !== 'draw') return;
    const { x, y } = e.target.getStage().getPointerPosition();
    setNewRect((prevRect) => ({
      x: prevRect!.x,
      y: prevRect!.y,
      width: x - prevRect!.x,
      height: y - prevRect!.y,
    }));
  };

  const handleMouseUp = (e: any) => {
    if (!drawing || selectedTool !== 'draw') return;
    setDrawing(false);
    if (newRect) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setPopupPosition({ x, y });
    }
  };

  const handleConfirmRectangle = (class_id: number) => {
    if (newRect) {
      addRectangle({ ...newRect, class_id });
      setNewRect(null);
      setPopupPosition(null);
    }
  };

  const borderThickness = 2; // Thickness of the border in pixels

  return (
    <Container fluid className="d-flex justify-content-center mt-4">
      <div
        className="canvas-container"
        style={{
          position: 'relative',
          border: `${borderThickness}px solid #007bff`,
          borderRadius: '0', // Set borderRadius to '0' to remove rounded corners
          display: 'inline-block',
          padding: '0', // Ensure there's no padding
        }}
      >
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            cursor: is_loading || is_sending ? 'not-allowed' : 'crosshair',
            backgroundColor: '#f8f9fa',
            display: 'block',
          }}
        >
          <Layer>
            {/* Render the background image */}
            {image && <KonvaImage image={image} width={stageSize.width} height={stageSize.height} />}

            {/* Render finalized rectangles */}
            {rectangles.map((rect, index) => (
              <FinalizedRectangle
                key={index}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                class_id={rect.class_id}
                index={index}
              />
            ))}

            {/* Render the new rectangle while it's being drawn (dashed) */}
            {newRect && (
              <Rect
                x={newRect.x}
                y={newRect.y}
                width={newRect.width}
                height={newRect.height}
                stroke="red"
                strokeWidth={2}
                dash={[10, 5]} // Dashed style
              />
            )}
          </Layer>
        </Stage>

        {/* Render the popup if a rectangle was drawn */}
        {popupPosition && (
          <PopupMenu x={popupPosition.x} y={popupPosition.y} onConfirm={handleConfirmRectangle} />
        )}

        {/* Overlay when loading or sending */}
        {(is_loading || is_sending) && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: stageSize.width,
              height: stageSize.height,
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
    </Container>
  );
};

export default ImageDrawingCanvas;
