import React, { useRef, useEffect, useState } from 'react'; 
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { classes } from 'config/classes'

interface ImageCanvasProps {
  imageUrl: string;
  rectangles: { x: number; y: number; width: number; height: number; class_id: number }[];
  width: number;
  height: number;
}


const getColorByClassId = (class_id: number) => {
  return classes[class_id].color ?? '#000000'; // Retorna a cor da classe ou preto se não houver
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
