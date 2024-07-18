import { useState, useEffect } from "react";

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

const useDrawingTools = (
	selectedTool: string,
	containerRef: React.RefObject<HTMLDivElement>,
	stageRef: React.RefObject<any>,
	isOpen: boolean
) => {
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
	}, [isOpen, containerRef]);

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

	return {
		dimensions,
		geometries,
		isCreating,
		currentPoints,
		currentRect,
		setCurrentRect,
		handleStageMouseDown,
		handleStageMouseMove,
		handleStageMouseUp
	};
};

export { useDrawingTools };
