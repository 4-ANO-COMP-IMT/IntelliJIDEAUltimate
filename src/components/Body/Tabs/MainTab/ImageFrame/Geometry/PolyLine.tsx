import React, { useState } from "react";
import { Line, Circle } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

interface Point {
	x: number;
	y: number;
}

interface PolyLineProps {
	points: Point[];
}

const PolyLine: React.FC<PolyLineProps> = ({ points }) => {
	const [polyPoints, setPolyPoints] = useState<Point[]>(points);

	const handleDragMove = (e: KonvaEventObject<DragEvent>, index: number) => {
		const newPoints = [...polyPoints];
		newPoints[index] = { x: e.target.x(), y: e.target.y() };
		setPolyPoints(newPoints);
	};

	const handleDragEnd = () => {};

	const handleInsertPoint = (index: number, newPoint: Point) => {
		const newPoints = [...polyPoints];
		newPoints.splice(index, 0, newPoint);
		setPolyPoints(newPoints);
	};

	const calculateMidPoint = (pointA: Point, pointB: Point): Point => {
		return {
			x: (pointA.x + pointB.x) / 2,
			y: (pointA.y + pointB.y) / 2
		};
	};

	return (
		<>
			<Line
				points={polyPoints.flatMap((p) => [p.x, p.y])}
				stroke="red"
				strokeWidth={2}
			/>
			{polyPoints.map((point, index) => (
				<Circle
					key={index}
					x={point.x}
					y={point.y}
					radius={5}
					fill="blue"
					draggable
					onDragMove={(e) => handleDragMove(e, index)}
					onDragEnd={handleDragEnd}
				/>
			))}
			{polyPoints.map((point, index) => {
				if (index === polyPoints.length - 1) return null;
				const midPoint = calculateMidPoint(
					point,
					polyPoints[index + 1]
				);
				return (
					<Circle
						key={`mid-${index}`}
						x={midPoint.x}
						y={midPoint.y}
						radius={5}
						fill="green"
						draggable
						onDragEnd={(e) =>
							handleInsertPoint(index + 1, {
								x: e.target.x(),
								y: e.target.y()
							})
						}
					/>
				);
			})}
		</>
	);
};

export default PolyLine;
