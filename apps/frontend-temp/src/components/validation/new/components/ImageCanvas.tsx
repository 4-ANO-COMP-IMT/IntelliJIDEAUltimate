import React, { useRef, useEffect, useState } from 'react'; 
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { classes } from 'config/classes';

interface Rectangle {
  x: number; // Centro X normalizado (0 a 1)
  y: number; // Centro Y normalizado (0 a 1)
  width: number; // Largura normalizada (0 a 1)
  height: number; // Altura normalizada (0 a 1)
  class_id: number;
}

interface ImageCanvasProps {
  imageUrl: string;
  rectangles: Rectangle[];
  width: number;
  height: number;
}

const getColorByClassId = (class_id: number) => {
  return classes[class_id]?.color || '#000000'; // Retorna a cor da classe ou preto se não houver
};

const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageUrl, rectangles, width, height }) => {
  const [image] = useImage(imageUrl); // Hook para carregar a imagem
  const [canvasSize, setCanvasSize] = useState({ width, height });
  const stageRef = useRef(null);

  // Atualiza o tamanho do canvas com base no tamanho da imagem carregada
  useEffect(() => {
    if (image) {
      const aspectRatio = image.width / image.height;
      if (width / height > aspectRatio) {
        setCanvasSize({ width: height * aspectRatio, height });
      } else {
        setCanvasSize({ width, height: width / aspectRatio });
      }
    }
  }, [image, width, height]);

  return (
    <Stage width={canvasSize.width} height={canvasSize.height} ref={stageRef}>
      <Layer>
        {/* Exibe a imagem como fundo do canvas */}
        {image && (
          <KonvaImage
            image={image}
            x={0}
            y={0}
            width={canvasSize.width}
            height={canvasSize.height}
          />
        )}

        {/* Desenha os retângulos sobre a imagem */}
        {rectangles.map((rect, index) => {
          const rectWidth = rect.width * canvasSize.width;
          const rectHeight = rect.height * canvasSize.height;
          const centerX = rect.x * canvasSize.width;
          const centerY = rect.y * canvasSize.height;

          return (
            <Rect
              key={index}
              x={centerX - rectWidth / 2}
              y={centerY - rectHeight / 2}
              width={rectWidth}
              height={rectHeight}
              stroke={getColorByClassId(rect.class_id)}
              strokeWidth={2}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default ImageCanvas;
