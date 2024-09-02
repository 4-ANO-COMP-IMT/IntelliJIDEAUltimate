import React, { useRef, useEffect, useContext, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Geometry from "./Geometry/Geometry";
import { DrawingContext, GeometryItem } from "context/DrawingContext";
import { ToolContext } from "context/ToolContext";
import GeometryPreview from "./Geometry/GeometryPreview";

interface ImageFrameProps {
	isOpen: boolean;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ isOpen }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<any>(null);

	const drawingContext = useContext(DrawingContext);
	const toolContext = useContext(ToolContext);

	if (!drawingContext || !toolContext) {
		throw new Error(
			"DrawingContext and ToolContext must be used within seus respectivos providers"
		);
	}

	const { state: drawingState, dispatch: drawingDispatch } = drawingContext;
	const { state: toolState } = toolContext;

	const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

	//add a window size listener and update the dimensions
	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				const { width, height } =
					containerRef.current.getBoundingClientRect();
				setDimensions({ width, height });
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			const { width, height } =
				containerRef.current.getBoundingClientRect();
			setDimensions({ width, height });
		}
	}, [isOpen]);

	useEffect(() => {
		if (stageRef.current) {
			stageRef.current.width(dimensions.width);
			stageRef.current.height(dimensions.height);
			stageRef.current.batchDraw();
		}
	}, [dimensions]);

	const handlePointerDown = () => {
		console.log("handlePointerDown");
		if (!toolState.selectedTool) return;
		const stage = stageRef.current;
		const point = stage.getPointerPosition();
		drawingDispatch({
			type: "POINTER_DOWN",
			point,
			selectedTool: toolState.selectedTool
		});
	};

	const handlePointerDrag = () => {
		console.log("handlePointerDrag");
		if (!drawingState.isDrawing) return;
		const stage = stageRef.current;
		const point = stage.getPointerPosition();
		drawingDispatch({ type: "POINTER_DRAG", point });
	};

	const handlePointerUp = () => {
		console.log("handlePointerUp");
		if (!drawingState.isDrawing) return;
		const stage = stageRef.current;
		const point = stage.getPointerPosition();
		drawingDispatch({ type: "POINTER_UP", point });
	};

	return (
		<div
			ref={containerRef}
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: "#5c949f"
			}}
		>
			<Stage
				width={dimensions.width}
				height={dimensions.height}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerDrag}
				onPointerUp={handlePointerUp}
				ref={stageRef}
			>
				<Layer>
					<Rect
						x={0}
						y={0}
						width={dimensions.width}
						height={dimensions.height}
						fill="lightgray"
					/>
					{drawingState.items.map(
						(item: GeometryItem, index: number) => (
							<Geometry item={item} index={index} key={index} />
						)
					)}
					{drawingState.previewItem && (
						<GeometryPreview
							previewItem={drawingState.previewItem}
						/>
					)}
				</Layer>
			</Stage>
		</div>
	);
};

export default ImageFrame;
