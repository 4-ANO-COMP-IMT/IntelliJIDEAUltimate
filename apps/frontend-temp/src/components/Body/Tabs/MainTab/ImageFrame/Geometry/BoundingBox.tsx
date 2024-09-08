// import React from "react";
// import { Rect, Circle } from "react-konva";
// import { Point } from "hooks/types";

// const BoundingBox: React.FC<{ startPoint: Point; endPoint: Point }> = ({ startPoint, endPoint }) => {
//   const rectProps = {
//     x: startPoint.x,
//     y: startPoint.y,
//     width: endPoint.x - startPoint.x,
//     height: endPoint.y - startPoint.y
//   };

//   return (
//     <>
//       <Rect
//         {...rectProps}
//         stroke="blue"
//         strokeWidth={2}
//       />
//       <Circle
//         x={rectProps.x}
//         y={rectProps.y}
//         radius={5}
//         fill="blue"
//       />
//       <Circle
//         x={rectProps.x + rectProps.width}
//         y={rectProps.y + rectProps.height}
//         radius={5}
//         fill="red"
//       />
//     </>
//   );
// };

// export default BoundingBox;
