import { useState } from "react";
import { RectProps } from "./types";

const useCreateBoundingBox = (isCreating: boolean) => {
	const [currentRect, setCurrentRect] = useState<RectProps | null>(null);

	const handleMouseDown = (e: any) => {
		if (isCreating && currentRect === null) {
			const { x, y } = e.target.getStage().getPointerPosition();
			setCurrentRect({ x, y, width: 0, height: 0 });
		}
	};

	const handleMouseMove = (e: any) => {
		if (isCreating && currentRect) {
			const { x, y } = e.target.getStage().getPointerPosition();
			setCurrentRect({
				...currentRect,
				width: x - currentRect.x,
				height: y - currentRect.y
			});
		}
	};

	const handleMouseUp = () => {
		if (isCreating && currentRect) {
			// Você pode adicionar lógica adicional aqui, se necessário
		}
	};

	return { currentRect, handleMouseDown, handleMouseMove, handleMouseUp };
};

export default useCreateBoundingBox;
