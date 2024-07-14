import React, { useState, useEffect } from 'react';
import { ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

interface ToolbarProps {
    initialSelectedTool?: string;
    onToolChange?: (value: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ initialSelectedTool, onToolChange }) => {
    const [selectedTool, setSelectedTool] = useState<string>(initialSelectedTool || '');

    const handleToolChange = (value: string) => {
        setSelectedTool(value);
        if (onToolChange) {
            onToolChange(value);
        }
    };

    // Sync with external control if initialSelectedTool changes
    useEffect(() => {
        if (initialSelectedTool) {
            setSelectedTool(initialSelectedTool);
        }
    }, [initialSelectedTool]);

    return (
        <ButtonToolbar>
            <ToggleButtonGroup
                type="radio"
                name="toolsGroup1"
                value={selectedTool}
                onChange={(value) => handleToolChange(value)}
                className="mb-2"
            >
                <ToggleButton variant="outline-secondary" value="select" id="select">
                    Selecionar
                </ToggleButton>
                <ToggleButton variant="outline-secondary" value="move" id="move">
                    Mover
                </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
                type="radio"
                name="toolsGroup2"
                value={selectedTool}
                onChange={(value) => handleToolChange(value)}
                className="mb-2"
            >
                <ToggleButton variant="outline-secondary" value="create" id="create">
                    Criar
                </ToggleButton>
                <ToggleButton variant="outline-secondary" value="edit" id="edit">
                    Editar
                </ToggleButton>
                <ToggleButton variant="outline-secondary" value="delete" id="delete">
                    Deletar
                </ToggleButton>
            </ToggleButtonGroup>
        </ButtonToolbar>
    );
};

export default Toolbar;
