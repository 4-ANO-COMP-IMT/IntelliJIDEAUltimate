import React, { useContext } from "react";
import { ToolContext } from "context/ToolContext";
import { DrawingContext } from "context/DrawingContext";
import {
	ButtonToolbar,
	ToggleButton,
	ToggleButtonGroup
} from "react-bootstrap";

interface ToolbarProps {
	onToolChange?: (value: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onToolChange }) => {
	const toolContext = useContext(ToolContext);
	const drawingContext = useContext(DrawingContext);

	if (!toolContext || !drawingContext) {
		throw new Error(
			"ToolContext and DrawingContext must be used within their respective providers"
		);
	}

	const { state: toolState, dispatch: toolDispatch } = toolContext;
	const { state: drawingState } = drawingContext;

	const handleToolChange = (value: string) => {
		toolDispatch({ type: "SET_TOOL", payload: value });
		if (onToolChange) {
			onToolChange(value);
		}
	};

	return (
		<ButtonToolbar>
			<ToggleButtonGroup
				type="radio"
				name="toolsGroup1"
				value={toolState.selectedTool}
				onChange={(value: string) => handleToolChange(value)}
				className="mb-2"
			>
				<ToggleButton
					variant="outline-secondary"
					value="createPolyLine"
					id="createPolyLine"
					disabled={drawingState.isDrawing}
				>
					{drawingState.isDrawing &&
					toolState.selectedTool === "createPolyLine"
						? "Criando Poly Line"
						: "Criar Poly Line"}
				</ToggleButton>
				<ToggleButton
					variant="outline-secondary"
					value="createBoundingBox"
					id="createBoundingBox"
					disabled={drawingState.isDrawing}
				>
					{drawingState.isDrawing &&
					toolState.selectedTool === "createBoundingBox"
						? "Criando Bounding Box"
						: "Criar Bounding Box"}
				</ToggleButton>
			</ToggleButtonGroup>
			<ToggleButtonGroup
				type="radio"
				name="toolsGroup2"
				value={toolState.selectedTool}
				onChange={(value: string) => handleToolChange(value)}
				className="mb-2"
			>
				<ToggleButton
					variant="outline-secondary"
					value="select"
					id="select"
					disabled={drawingState.isDrawing}
				>
					Selecionar
				</ToggleButton>
				<ToggleButton
					variant="outline-secondary"
					value="resize"
					id="resize"
					disabled={drawingState.isDrawing}
				>
					Redimensionar
				</ToggleButton>
				<ToggleButton
					variant="outline-secondary"
					value="move"
					id="move"
					disabled={drawingState.isDrawing}
				>
					Mover
				</ToggleButton>
				<ToggleButton
					variant="outline-secondary"
					value="delete"
					id="delete"
					disabled={drawingState.isDrawing}
				>
					Deletar
				</ToggleButton>
			</ToggleButtonGroup>
		</ButtonToolbar>
	);
};

export default Toolbar;
