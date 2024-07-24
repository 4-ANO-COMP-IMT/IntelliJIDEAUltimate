import { useState } from "react";
import { Point } from "./types";

const useCreatePolyline = (isCreating: boolean) => {
	const [currentPoints, setCurrentPoints] = useState<Point[]>([]);

	const handleMouseDown = (e: any) => {
		if (isCreating) {
			const { x, y } = e.target.getStage().getPointerPosition();
			setCurrentPoints((prevPoints) => [...prevPoints, { x, y }]);
		}
	};

	const handleMouseMove = (e: any) => {
		if (isCreating && currentPoints.length > 0) {
			const { x, y } = e.target.getStage().getPointerPosition();
			setCurrentPoints((prevPoints) => [...prevPoints, { x, y }]);
		}
	};

	const handleMouseUp = () => {
		if (isCreating) {
			// Você pode adicionar lógica adicional aqui, se necessário
		}
	};

	return { currentPoints, handleMouseDown, handleMouseMove, handleMouseUp };
};

export default useCreatePolyline;
