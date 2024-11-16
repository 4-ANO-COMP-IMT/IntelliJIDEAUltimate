// DrawingContext.tsx
import React, { createContext, useContext, useReducer } from "react";
import { ToolContext, ToolContextValue } from "./ToolContext";

export interface Point {
	x: number;
	y: number;
}

export interface Polyline {
	type: "polyline";
	points: Point[];
}

export interface BoundingBox {
	type: "boundingBox";
	startPoint: Point;
	endPoint: Point;
}

export type GeometryItem = Polyline | BoundingBox;

export type PreviewPolyline = {
	type: "polyline";
	points: Point[];
	currentMovingPoint: Point | null;
	currentMovingPointIndex: number | null;
	closedGeometry: boolean;
};

export type PreviewBoundingBox = {
	type: "boundingBox";
	startPoint: Point;
	endPoint: Point;
	hasMoved: boolean;
};

export type DrawingState = {
	previewItem: PreviewBoundingBox | PreviewPolyline | null;
	items: GeometryItem[];
	isDrawing: boolean;
};

export type Action =
	| { type: "POINTER_DOWN"; point: Point; selectedTool: string | null }
	| { type: "POINTER_DRAG"; point: Point }
	| { type: "POINTER_UP"; point: Point };

const initialDrawingState: DrawingState = {
	previewItem: null,
	items: [],
	isDrawing: false
};

const DrawingReducer = (
	drawingState: DrawingState,
	action: Action
): DrawingState => {
	// const toolContext = useContext(ToolContext);
	// if (!toolContext) {
	//   throw new Error("ToolContext must be used within a ToolProvider");
	// }
	// const { state: toolState } = toolContext;

	console.log(action, drawingState);

	switch (action.type) {
		case "POINTER_DOWN":
			if (action.selectedTool === "createPolyLine") {
				if (drawingState.previewItem === null) {
					return {
						...drawingState,
						isDrawing: true,
						previewItem: {
							type: "polyline",
							currentMovingPoint: action.point,
							currentMovingPointIndex: 0,
							points: [],
							closedGeometry: false
						} as PreviewPolyline
					};
				} else {
					if (drawingState.previewItem.type === "polyline") {
						const index = drawingState.previewItem.points.length;
						return {
							...drawingState,
							previewItem: {
								...drawingState.previewItem,
								currentMovingPoint: action.point,
								currentMovingPointIndex: index
							}
						};
					}
				}
			}
			if (action.selectedTool === "createBoundingBox") {
				return {
					...drawingState,
					isDrawing: true,
					previewItem: {
						type: "boundingBox",
						startPoint: action.point,
						endPoint: action.point,
						hasMoved: false
					} as PreviewBoundingBox
				};
			}
			return drawingState;

		case "POINTER_DRAG":
			if (drawingState.previewItem?.type === "polyline") {
				const newPreviewItem = {
					...drawingState.previewItem,
					currentMovingPoint: action.point
				};
				return {
					...drawingState,
					previewItem: newPreviewItem
				};
			}
			if (drawingState.previewItem?.type === "boundingBox") {
				const newPreviewItem = {
					...drawingState.previewItem,
					endPoint: action.point,
					hasMoved: true
				};
				return {
					...drawingState,
					previewItem: newPreviewItem
				};
			}
			return drawingState;

		case "POINTER_UP":
			if (drawingState.previewItem?.type === "polyline") {
				if (drawingState.previewItem.currentMovingPointIndex !== null) {
					const newPreviewItem = {
						...drawingState.previewItem,
						currentMovingPoint: null,
						currentMovingPointIndex: null,
						points: [
							...drawingState.previewItem.points.slice(
								0,
								drawingState.previewItem.currentMovingPointIndex
							),
							action.point,
							...drawingState.previewItem.points.slice(
								drawingState.previewItem.currentMovingPointIndex
							)
						]
					};
					return {
						...drawingState,
						previewItem: newPreviewItem
					};
				}
			}
			if (drawingState.previewItem?.type === "boundingBox") {
				if (drawingState.previewItem.hasMoved) {
					console.log(
						"POINTER_UP final",
						drawingState.previewItem,
						{
							...drawingState,
							isDrawing: false,
							items: [
								...drawingState.items,
								{
									type: "boundingBox",
									startPoint:
										drawingState.previewItem.startPoint,
									endPoint: action.point
								} as BoundingBox
							],
							previewItem: null
						},
						action
					);
					return {
						...drawingState,
						isDrawing: false,
						items: [
							...drawingState.items,
							{
								type: "boundingBox",
								startPoint: drawingState.previewItem.startPoint,
								endPoint: action.point
							} as BoundingBox
						],
						previewItem: null
					};
				} else {
					return {
						...drawingState,
						isDrawing: false,
						previewItem: null
					};
				}
			}
			return drawingState;

		default:
			return drawingState;
	}
};

export const DrawingContext = createContext<
	{ state: DrawingState; dispatch: React.Dispatch<any> } | undefined
>(undefined);

export const DrawingProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(DrawingReducer, initialDrawingState);

	return (
		<DrawingContext.Provider value={{ state, dispatch }}>
			{children}
		</DrawingContext.Provider>
	);
};
