import React from "react";
import { ToolProvider } from "contexts/ToolContext";
import { DrawingProvider } from "contexts/DrawingContext";
// import { InteractionStateProvider } from 'context/InteractionStateContext';
import Toolbar from "./Toolbar";
import { Col, Container, Row } from "react-bootstrap";
import ButtonBar from "./ButtonBar";
import ClassToggleList from "./ClassToggleList/ClassToggleList";
import ImageFrame from "./ImageFrame/ImageFrame";

const MainTab: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
	return (
		<ToolProvider>
			<DrawingProvider>
				{/* <InteractionStateProvider> */}
				<Toolbar />
				<Container fluid style={{ padding: 0 }}>
					<Row
						className="d-flex flex-column flex-lg-row"
						style={{ height: "75vh" }}
					>
						<Col lg={9} md={12} style={{ overflowY: "auto" }}>
							<div style={{ height: "500px" }}>
								<ImageFrame isOpen={isOpen} />
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
				{/* </InteractionStateProvider> */}
			</DrawingProvider>
		</ToolProvider>
	);
};

export default MainTab;
