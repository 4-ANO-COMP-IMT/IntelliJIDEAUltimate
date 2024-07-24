import { useState, useEffect } from "react";

const useDrawingState = (selectedTool: string) => {
	const [isCreating, setIsCreating] = useState(false);
	const [creatingType, setCreatingType] = useState<
		"polyline" | "rectangle" | null
	>(null);

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

	return { isCreating, creatingType };
};

export default useDrawingState;
