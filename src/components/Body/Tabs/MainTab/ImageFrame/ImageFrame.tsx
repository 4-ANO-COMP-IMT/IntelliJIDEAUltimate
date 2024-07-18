import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Line, Circle } from "react-konva";
import Geometry from "./Geometry";

interface Point {
	x: number;
	y: number;
}

interface RectProps {
	x: number;
	y: number;
	width: number;
	height: number;
}

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
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	});
	const [geometries, setGeometries] = useState<GeometryItem[]>([]);
	const [isCreating, setIsCreating] = useState(false);
	const [creatingType, setCreatingType] = useState<
		"polyline" | "rectangle" | null
	>(null);
	const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
	const [currentRect, setCurrentRect] = useState<RectProps | null>(null);

	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				setDimensions({
					width: containerRef.current.offsetWidth,
					height: containerRef.current.offsetHeight
				});
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isOpen]);

	useEffect(() => {
		if (selectedTool === "createPolyLine") {
			setIsCreating(true);
			setCreatingType("polyline");
		} else if (selectedTool === "createBoundingBox") {
			setIsCreating(true);
			setCreatingType("rectangle");
		} else {
			setIsCreating(false);
			setCreatingType(null);
		}
	}, [selectedTool]);

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

	const handleStageMouseDown = (e: any) => {
		if (
			isCreating &&
			creatingType === "rectangle" &&
			currentRect === null
		) {
			const { x, y } = e.target.getStage().getPointerPosition();
			setCurrentRect({ x, y, width: 0, height: 0 });
		} else if (isCreating && creatingType === "polyline") {
			const { x, y } = e.target.getStage().getPointerPosition();
			setCurrentPoints([...currentPoints, { x, y }]);
		}
	};

	const handleStageMouseMove = (e: any) => {
		if (isCreating) {
			const { x, y } = e.target.getStage().getPointerPosition();
			if (creatingType === "rectangle" && currentRect) {
				setCurrentRect({
					...currentRect,
					width: x - currentRect.x,
					height: y - currentRect.y
				});
			} else if (
				creatingType === "polyline" &&
				currentPoints.length > 0
			) {
				const points = [...currentPoints, { x, y }];
				setCurrentPoints(points);
			}
		}
	};

	const handleStageMouseUp = (e: any) => {
		if (isCreating && creatingType === "rectangle" && currentRect) {
			setGeometries([
				...geometries,
				{ type: "rectangle", initialRect: currentRect }
			]);
			setCurrentRect(null);
			setIsCreating(false);
		} else if (isCreating && creatingType === "polyline") {
			setGeometries([
				...geometries,
				{ type: "polyline", points: currentPoints }
			]);
			setCurrentPoints([]);
			setIsCreating(false);
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape" && isCreating) {
			setIsCreating(false);
			setCurrentPoints([]);
			setCurrentRect(null);
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isCreating]);

	console.log(dimensions);
	console.log(isOpen);

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
					{isCreating && creatingType === "polyline" && (
						<>
							<Line
								points={currentPoints.flatMap((p) => [
									p.x,
									p.y
								])}
								stroke="red"
								strokeWidth={2}
								lineCap="round"
								lineJoin="round"
							/>
							{currentPoints.map((point, index) => (
								<Circle
									key={index}
									x={point.x}
									y={point.y}
									radius={5}
									fill="blue"
									draggable
									onDragMove={(e) => handleStageMouseMove(e)}
									onDragEnd={handleStageMouseUp}
								/>
							))}
						</>
					)}
					{isCreating &&
						creatingType === "rectangle" &&
						currentRect && (
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
