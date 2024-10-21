// import React, { useState } from "react";
// import { Line, Circle } from "react-konva";
// import { Point } from "../../../../hooks/types";
// import { calculateMidPoint, handleInsertPoint } from "@src/hooks/helpers";

// const PolyLine: React.FC<{ points: Point[] }> = ({ points }) => {
//   const [polyPoints, setPolyPoints] = useState<Point[]>(points);

//   const handleDragMove = (e: any, index: number) => {
//     const newPoints = [...polyPoints];
//     newPoints[index] = { x: e.target.x(), y: e.target.y() };
//     setPolyPoints(newPoints);
//   };

//   return (
//     <>
//       <Line
//         points={polyPoints.flatMap((p) => [p.x, p.y])}
//         stroke="red"
//         strokeWidth={2}
//       />
//       {polyPoints.map((point, index) => (
//         <Circle
//           key={index}
//           x={point.x}
//           y={point.y}
//           radius={5}
//           fill="blue"
//           draggable
//           onDragMove={(e) => handleDragMove(e, index)}
//         />
//       ))}
//       {polyPoints.map((point, index) => {
//         if (index === polyPoints.length - 1) return null;
//         const midPoint = calculateMidPoint(point, polyPoints[index + 1]);
//         return (
//           <Circle
//             key={`mid-${index}`}
//             x={midPoint.x}
//             y={midPoint.y}
//             radius={5}
//             fill="green"
//             draggable
//             onDragEnd={(e) => setPolyPoints(handleInsertPoint(polyPoints, index + 1, { x: e.target.x(), y: e.target.y() }))}
//           />
//         );
//       })}
//     </>
//   );
// };

// export default PolyLine;
