import React, { useState } from 'react';
import { Rect } from 'react-konva';
import { useAppContext } from './AppContext';
import { useToolContext } from './ToolContext';

import {classes} from 'config/classes';
interface FinalizedRectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  class_id: number;
  index: number; // Índice do retângulo no array de retângulos do contexto
}



const getClassColor = (class_id: number) => {
  return classes[class_id].color ?? '#000000'; // Retorna a cor da classe ou preto se não houver
};

const FinalizedRectangle: React.FC<FinalizedRectangleProps> = ({ x, y, width, height, class_id, index }) => {
  const { selectedTool } = useToolContext();
  const { removeRectangle } = useAppContext();
  const [hovered, setHovered] = useState(false);

  // Função para deletar o retângulo ao clicar nele em modo "erase"
  const handleDelete = () => {
    if (selectedTool === 'erase') {
      removeRectangle(index); // Remove o retângulo pelo índice
    }
  };

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={hovered && selectedTool === 'erase' ? 'rgba(255,0,0,0.3)' : "rgba(0,0,0,0)"} // Preenchimento semi-transparente se hover e "erase" selecionado
      stroke={hovered && selectedTool === 'erase' ? 'red' : getClassColor(class_id)} // Borda vermelha se hover e "erase" selecionado
      strokeWidth={hovered && selectedTool === 'erase' ? 4 : 2} // Borda mais espessa se hover e "erase"
      onMouseEnter={() => setHovered(true)} // Marca que o mouse está sobre o retângulo
      onMouseLeave={() => setHovered(false)} // Marca que o mouse saiu do retângulo
      onClick={handleDelete} // Deleta o retângulo ao clicar quando "erase" está ativo
    />
  );
};

export default FinalizedRectangle;
