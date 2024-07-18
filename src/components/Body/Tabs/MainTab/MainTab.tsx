import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Toolbar from "./Toolbar";
import ImageFrame from "./ImageFrame";
import ButtonBar from "./ButtonBar";

const MainTab: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
	const [selectedTool, setSelectedTool] = useState<string>("");
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerHeight, setContainerHeight] = useState<number>(0);

	const handleToolChange = (tool: string) => {
		setSelectedTool(tool);
		setIsCreating(
			tool === "createPolyLine" || tool === "createBoundingBox"
		);
	};

	useEffect(() => {
		if (containerRef.current) {
			setContainerHeight(containerRef.current.clientHeight);
		}
	}, [isOpen]);

	return (
		<>
			<Toolbar onToolChange={handleToolChange} isCreating={isCreating} />
			<Container fluid style={{ padding: 0 }} ref={containerRef}>
				<Row noGutters style={{ height: "75vh" }}>
					<Col md={12}>
						<ImageFrame
							selectedTool={selectedTool}
							isOpen={isOpen}
						/>
					</Col>
				</Row>
			</Container>
			<ButtonBar />
		</>
	);
};

export default MainTab;
