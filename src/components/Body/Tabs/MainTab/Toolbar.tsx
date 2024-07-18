import React, { useState, useEffect } from "react";
import {
	ButtonToolbar,
	ToggleButton,
	ToggleButtonGroup
} from "react-bootstrap";

interface ToolbarProps {
	onToolChange: (value: string) => void;
	isCreating: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ onToolChange, isCreating }) => {
	const [selectedTool, setSelectedTool] = useState<string>("");

	const handleToolChange = (value: string) => {
		if (!isCreating) {
			setSelectedTool(value);
			onToolChange(value);
		}
	};

	useEffect(() => {
		if (!isCreating) {
			setSelectedTool("");
		}
	}, [isCreating]);

	return (
		<ButtonToolbar>
			<ToggleButtonGroup
				type="radio"
				name="toolsGroup1"
				value={selectedTool}
				onChange={(value) => handleToolChange(value)}
				className="mb-2"
			>
				<ToggleButton
					variant="outline-secondary"
					value="createPolyLine"
					id="createPolyLine"
					disabled={isCreating}
				>
					{isCreating && selectedTool === "createPolyLine"
						? "Criando Poly Line"
						: "Criar Poly Line"}
				</ToggleButton>
				<ToggleButton
					variant="outline-secondary"
					value="createBoundingBox"
					id="createBoundingBox"
					disabled={isCreating}
				>
					{isCreating && selectedTool === "createBoundingBox"
						? "Criando Bounding Box"
						: "Criar Bounding Box"}
				</ToggleButton>
			</ToggleButtonGroup>
			<ToggleButtonGroup
				type="radio"
				name="toolsGroup2"
				value={selectedTool}
				onChange={(value) => handleToolChange(value)}
				className="mb-2"
			>
				<ToggleButton
					variant="outline-secondary"
					value="select"
					id="select"
					disabled={isCreating}
				>
					Selecionar
				</ToggleButton>
				<ToggleButton
					variant="outline-secondary"
					value="resize"
					id="resize"
					disabled={isCreating}
				>
					Redimensionar
				</ToggleButton>
				<ToggleButton
					variant="outline-secondary"
					value="move"
					id="move"
					disabled={isCreating}
				>
					Mover
				</ToggleButton>
				<ToggleButton
					variant="outline-secondary"
					value="delete"
					id="delete"
					disabled={isCreating}
				>
					Deletar
				</ToggleButton>
			</ToggleButtonGroup>
		</ButtonToolbar>
	);
};

export default Toolbar;
