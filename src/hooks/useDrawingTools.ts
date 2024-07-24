import { useState } from "react";
import useDimensions from "./useDimensions";
import useDrawingState from "./useDrawingState";
import useCreatePolyline from "./useCreatePolyline";
import useCreateBoundingBox from "./useCreateBoundingBox";
import { Point, RectProps } from "./types";

interface GeometryItem {
	type: "polyline" | "rectangle";
	points?: Point[];
	initialRect?: RectProps;
}

const useDrawingTools = (
	selectedTool: string,
	containerRef: React.RefObject<HTMLDivElement>,
	stageRef: React.RefObject<any>,
	isOpen: boolean
) => {
	const dimensions = useDimensions(containerRef, isOpen);
	const { isCreating, creatingType } = useDrawingState(selectedTool);
	const {
		currentPoints,
		handleMouseDown: handlePolylineMouseDown,
		handleMouseMove: handlePolylineMouseMove,
		handleMouseUp: handlePolylineMouseUp
	} = useCreatePolyline(isCreating);
	const {
		currentRect,
		handleMouseDown: handleRectMouseDown,
		handleMouseMove: handleRectMouseMove,
		handleMouseUp: handleRectMouseUp
	} = useCreateBoundingBox(isCreating);
	const [geometries, setGeometries] = useState<GeometryItem[]>([]);

	const handleStageMouseDown = (e: any) => {
		if (creatingType === "rectangle") {
			handleRectMouseDown(e);
		} else if (creatingType === "polyline") {
			handlePolylineMouseDown(e);
		}
	};

	const handleStageMouseMove = (e: any) => {
		if (creatingType === "rectangle") {
			handleRectMouseMove(e);
		} else if (creatingType === "polyline") {
			handlePolylineMouseMove(e);
		}
	};

	const handleStageMouseUp = (e: any) => {
		if (creatingType === "rectangle") {
			if (currentRect) {
				setGeometries((prevGeometries) => [
					...prevGeometries,
					{ type: "rectangle", initialRect: currentRect }
				]);
			}
			handleRectMouseUp();
		} else if (creatingType === "polyline") {
			if (currentPoints.length > 0) {
				setGeometries((prevGeometries) => [
					...prevGeometries,
					{ type: "polyline", points: currentPoints }
				]);
			}
			handlePolylineMouseUp();
		}
	};

	return {
		dimensions,
		geometries,
		isCreating,
		currentPoints,
		currentRect,
		handleStageMouseDown,
		handleStageMouseMove,
		handleStageMouseUp
	};
};

export default useDrawingTools;
