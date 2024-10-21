import React from "react";
import { Button } from "react-bootstrap";

const ButtonBar: React.FC = () => {
	return (
		<div className="button-bar d-flex justify-content-center">
			<Button variant="primary">Button 1</Button>
			<Button variant="secondary">Button 2</Button>
			<Button variant="success">Button 3</Button>
			{/* Add more buttons as needed */}
		</div>
	);
};

export default ButtonBar;
