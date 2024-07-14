// BoundingBox.tsx
import React, { useState } from 'react';
import { Layer, Rect, Circle } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BoundingBoxProps {
  initialRect: RectProps;
}

const BoundingBox: React.FC<BoundingBoxProps> = ({ initialRect }) => {
  const [rectangle, setRectangle] = useState<RectProps>(initialRect);

  const handleDragMove = (e: KonvaEventObject<DragEvent>, index: number) => {
    const newRect = { ...rectangle };
    if (index === 0) {
      newRect.x = e.target.x();
      newRect.y = e.target.y();
    } else if (index === 1) {
      newRect.width = e.target.x() - newRect.x;
      newRect.height = e.target.y() - newRect.y;
    }
    setRectangle(newRect);
  };

  const handleDragEnd = () => {};

  return (
    <>
      <Rect
        x={rectangle.x}
        y={rectangle.y}
        width={rectangle.width}
        height={rectangle.height}
        stroke="blue"
        strokeWidth={2}
        draggable
        onDragMove={(e) => handleDragMove(e, 0)}
        onDragEnd={handleDragEnd}
      />
      <Circle
        x={rectangle.x}
        y={rectangle.y}
        radius={5}
        fill="blue"
        draggable
        onDragMove={(e) => handleDragMove(e, 0)}
        onDragEnd={handleDragEnd}
      />
      <Circle
        x={rectangle.x + rectangle.width}
        y={rectangle.y + rectangle.height}
        radius={5}
        fill="red"
        draggable
        onDragMove={(e) => handleDragMove(e, 1)}
        onDragEnd={handleDragEnd}
      />
    </>
  );
};

export default BoundingBox;
