// Geometry.tsx
import React from 'react';
import PolyLine from './PolyLine';
import BoundingBox from './BoundingBox';

interface GeometryProps {
  type: 'polyline' | 'rectangle';
  points?: { x: number; y: number }[];
  initialRect?: { x: number; y: number; width: number; height: number };
}

const Geometry: React.FC<GeometryProps> = ({ type, points, initialRect }) => {
  if (type === 'polyline' && points) {
    return <PolyLine points={points} />;
  } else if (type === 'rectangle' && initialRect) {
    return <BoundingBox initialRect={initialRect} />;
  }
  return null;
};

export default Geometry;
