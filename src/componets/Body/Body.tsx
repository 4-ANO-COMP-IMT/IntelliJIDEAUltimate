import React, { useState } from "react";
import ImageFrame from "./ImageFrame/ImageFrame";
import { Button, Container } from "react-bootstrap";
import Toolbar from "./Toolbar";
import FilterCollapse from "./filters/FilterCollapse";

const Body: React.FC = () => {
        const [selectedTool, setSelectedTool] = useState<string>("");
        const [isCreating, setIsCreating] = useState<boolean>(false);

        const handleToolChange = (tool: string) => {
                setSelectedTool(tool);
                setIsCreating(
                        tool === "createPolyLine" ||
                                tool === "createBoundingBox"
                );
        };

        return (
                <div className="container">
                        <div className="filter-section">
                                <FilterCollapse />
                        </div>

                        <div className="tools">
                                <Toolbar
                                        onToolChange={handleToolChange}
                                        isCreating={isCreating}
                                />
                        </div>

                        <Container fluid style={{ height: "75vh", padding: 0 }}>
                                <ImageFrame selectedTool={selectedTool} />
                        </Container>

                        <div className="button-bar d-flex justify-content-center">
                                <Button variant="primary">Button 1</Button>
                                <Button variant="secondary">Button 2</Button>
                                <Button variant="success">Button 3</Button>
                                {/* Add more buttons as needed */}
                        </div>
                </div>
        );
};

export default Body;
