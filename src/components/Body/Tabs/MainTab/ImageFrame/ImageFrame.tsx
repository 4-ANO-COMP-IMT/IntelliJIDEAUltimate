import React, { useRef, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Geometry from "./Geometry/Geometry";
import useDrawingTools from "./../../../../../hooks/useDrawingTools";
import { Point, RectProps } from "./../../../../../hooks/types";

interface GeometryItem {
	type: "polyline" | "rectangle";
	points?: Point[];
	initialRect?: RectProps;
}

interface ImageFrameProps {
	selectedTool: string;
	isOpen: boolean;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ selectedTool, isOpen }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<any>(null);
	const {
		dimensions,
		geometries,
		isCreating,
		currentPoints,
		currentRect,
		handleStageMouseDown,
		handleStageMouseMove,
		handleStageMouseUp
	} = useDrawingTools(selectedTool, containerRef, stageRef, isOpen);

	useEffect(() => {
		if (stageRef.current) {
			stageRef.current.width(dimensions.width);
			stageRef.current.height(dimensions.height);
			stageRef.current.batchDraw();
		}
	}, [dimensions, isOpen]);

	useEffect(() => {
		if (isOpen && stageRef.current) {
			setTimeout(() => {
				stageRef.current.width(dimensions.width);
				stageRef.current.height(dimensions.height);
				stageRef.current.batchDraw();
			}, 100);
		}
	}, [isOpen, dimensions]);

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
				onMouseDown={handleStageMouseDown}
				onMouseMove={handleStageMouseMove}
				onMouseUp={handleStageMouseUp}
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
					{geometries.map((geo, index) => (
						<Geometry
							key={index}
							type={geo.type}
							points={geo.points}
							initialRect={geo.initialRect}
						/>
					))}
					{isCreating && currentRect && (
						<Rect
							x={currentRect.x}
							y={currentRect.y}
							width={currentRect.width}
							height={currentRect.height}
							stroke="blue"
							strokeWidth={2}
							dash={[4, 4]}
						/>
					)}
				</Layer>
			</Stage>
		</div>
	);
};

export default ImageFrame;
