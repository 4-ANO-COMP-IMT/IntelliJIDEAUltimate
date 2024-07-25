import React from "react";
import { Line, Rect } from "react-konva";
import { GeometryItem } from "context/DrawingContext";

interface GeometryProps {
  item: GeometryItem;
  index: Number;
}

const Geometry: React.FC<GeometryProps> = ({ item , index}) => {
  switch (item.type) {
    case "polyline":
      return (
        <Line
          points={item.points.flatMap((point) => [point.x, point.y])}
          stroke="black"
          strokeWidth={2}
          lineCap="round"
          lineJoin="round"
        />
      );
    case "boundingBox":
      const { startPoint, endPoint } = item;
      const width = endPoint.x - startPoint.x;
      const height = endPoint.y - startPoint.y;
      return (
        <Rect
          x={startPoint.x}
          y={startPoint.y}
          width={width}
          height={height}
          stroke="blue"
          strokeWidth={2}
          dash={[4, 4]}
        />
      );
    default:
      return null;
  }
};

export default Geometry;
