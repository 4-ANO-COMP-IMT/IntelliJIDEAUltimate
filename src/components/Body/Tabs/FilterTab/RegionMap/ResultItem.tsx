import React from "react";
import { Card, Button } from "react-bootstrap";

interface ResultItemProps {
	place: any;
	isSelected: boolean;
	onSelect: () => void;
}

const ResultItem: React.FC<ResultItemProps> = ({
	place,
	isSelected,
	onSelect
}) => {
	return (
		<Card className="mb-2">
			<Card.Body>
				<Card.Title>{place.display_name.split(",")[0]}</Card.Title>
				<Card.Text>{place.display_name}</Card.Text>
				<Button
					variant={isSelected ? "success" : "outline-primary"}
					onClick={onSelect}
				>
					{isSelected ? "Selecionado" : "Selecionar"}
				</Button>
			</Card.Body>
		</Card>
	);
};

export default ResultItem;
