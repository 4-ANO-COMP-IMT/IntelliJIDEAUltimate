import React, { useState } from 'react';
import { Rect } from 'react-konva';
import { useAppContext } from './AppContext';
import { useToolContext } from './ToolContext';
import { classes } from 'config/classes';

interface FinalizedRectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  class_id: number;
  index: number;
}

const getClassColor = (class_id: number) => {
  return classes[class_id].color ?? '#000000';
};

const FinalizedRectangle: React.FC<FinalizedRectangleProps> = ({ x, y, width, height, class_id, index }) => {
  const { selectedTool } = useToolContext();
  const { removeRectangle } = useAppContext();
  const [hovered, setHovered] = useState(false);

  const handleDelete = () => {
    if (selectedTool === 'erase') {
      removeRectangle(index);
    }
  };

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={hovered && selectedTool === 'erase' ? 'rgba(255,0,0,0.3)' : "rgba(0,0,0,0)"}
      stroke={hovered && selectedTool === 'erase' ? 'red' : getClassColor(class_id)}
      strokeWidth={hovered && selectedTool === 'erase' ? 4 : 2}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleDelete}
    />
  );
};

export default FinalizedRectangle;
