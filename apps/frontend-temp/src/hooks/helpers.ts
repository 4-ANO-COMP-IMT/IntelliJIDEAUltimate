import { Point } from "contexts/DrawingContext";

export const calculateMidPoint = (pointA: Point, pointB: Point): Point => {
	return {
		x: (pointA.x + pointB.x) / 2,
		y: (pointA.y + pointB.y) / 2
	};
};

export const handleInsertPoint = (
	points: Point[],
	index: number,
	newPoint: Point
): Point[] => {
	const newPoints = [...points];
	newPoints.splice(index, 0, newPoint);
	return newPoints;
};
