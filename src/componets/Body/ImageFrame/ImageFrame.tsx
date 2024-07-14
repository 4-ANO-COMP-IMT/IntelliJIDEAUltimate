// ImageFrame.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import Geometry from './Geometry';

interface Point {
  x: number;
  y: number;
}

interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GeometryItem {
  type: 'polyline' | 'rectangle';
  points?: Point[];
  initialRect?: RectProps;
}

const ImageFrame: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const geometries: GeometryItem[] = [
    {
      type: 'polyline',
      points: [
        { x: 50, y: 60 },
        { x: 200, y: 80 },
        { x: 300, y: 200 },
      ],
    },
    {
      type: 'rectangle',
      initialRect: { x: 400, y: 150, width: 150, height: 100 },
    },
  ];

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', backgroundColor:'#5c949f' }}>
        {/* aaaa: {dimensions.width} x {dimensions.height} */}
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={dimensions.width}
            height={dimensions.height}
            fill="lightgray"  // Cor de fundo do canvas
          />
          {geometries.map((geo, index) => (
            <Geometry
              key={index}
              type={geo.type}
              points={geo.points}
              initialRect={geo.initialRect}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageFrame;
