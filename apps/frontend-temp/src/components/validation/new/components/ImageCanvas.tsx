import React, { useRef, useEffect, useState } from 'react'; 
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface ImageCanvasProps {
  imageUrl: string;
  rectangles: { x: number; y: number; width: number; height: number; class_id: number }[];
  width: number;
  height: number;
}

// Paleta de cores para os diferentes class_ids
const colorPalette = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFC300',
  '#581845', '#DAF7A6', '#900C3F', '#C70039', '#2ECC71'
];

const getColorByClassId = (class_id: number) => {
  return colorPalette[class_id % colorPalette.length];
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
        {rectangles.map((rect, index) => (
          <Rect
            key={index}
            x={rect.x * canvasSize.width}
            y={rect.y * canvasSize.height}
            width={rect.width * canvasSize.width}
            height={rect.height * canvasSize.height}
            stroke={getColorByClassId(rect.class_id)}
            strokeWidth={2}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default ImageCanvas;
