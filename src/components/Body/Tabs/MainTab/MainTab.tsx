import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Toolbar from "./Toolbar";
import ImageFrame from "./ImageFrame";
import ButtonBar from "./ButtonBar";
import ClassToggleList from "./ClassToggleList/ClassToggleList";

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
				<Row
					noGutters
					className="d-flex flex-column flex-lg-row"
					style={{ height: "75vh" }}
				>
					<Col lg={9} md={12} style={{ overflowY: "auto" }}>
						<div style={{ height: "500px" }}>
							<ImageFrame
								selectedTool={selectedTool}
								isOpen={isOpen}
							/>
						</div>
					</Col>
					<Col lg={3} md={12} style={{ overflowY: "auto" }}>
						<div style={{ height: "500px" }}>
							<ClassToggleList />
						</div>
					</Col>
				</Row>
			</Container>
			<ButtonBar />
		</>
	);
};

export default MainTab;
