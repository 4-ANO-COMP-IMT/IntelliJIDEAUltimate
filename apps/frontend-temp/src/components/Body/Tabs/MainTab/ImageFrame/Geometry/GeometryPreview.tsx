import React from "react";
import { Line, Rect } from "react-konva";
import {
	DrawingState,
	PreviewBoundingBox,
	PreviewPolyline
} from "contexts/DrawingContext";

interface GeometryPreviewProps {
	previewItem: DrawingState["previewItem"];
}

const GeometryPreview: React.FC<{
	previewItem: PreviewBoundingBox | PreviewPolyline;
}> = ({ previewItem }) => {
	if (!previewItem) return null;

	switch (previewItem.type) {
		case "polyline":
			const points = previewItem.currentMovingPoint
				? [...previewItem.points, previewItem.currentMovingPoint]
				: previewItem.points;
			return (
				<Line
					points={points.flatMap((point) => [point.x, point.y])}
					stroke="black"
					strokeWidth={2}
					lineCap="round"
					lineJoin="round"
					dash={[10, 5]}
				/>
			);
		case "boundingBox":
			const { startPoint, endPoint } = previewItem;
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
					dash={[10, 5]}
				/>
			);
		default:
			return null;
	}
};

export default GeometryPreview;
