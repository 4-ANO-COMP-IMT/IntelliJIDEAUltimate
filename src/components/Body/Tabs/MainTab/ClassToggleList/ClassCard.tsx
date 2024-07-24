import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaStar, FaRegStar, FaCheckCircle, FaCircle } from "react-icons/fa";

interface ClassCardProps {
	cls: { id: number; label: string };
	isFavorite: boolean;
	isSelected: boolean;
	onFavoriteToggle: (id: number) => void;
	onSelectToggle: (id: number) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
	cls,
	isFavorite,
	isSelected,
	onFavoriteToggle,
	onSelectToggle
}) => (
	<Card key={cls.id} className="mb-2 w-100">
		<Card.Body className="d-flex justify-content-between align-items-center">
			<div className="d-flex flex-column">
				<span>{cls.label}</span>
				<small>ID: {cls.id}</small>
			</div>
			<div className="d-flex align-items-center">
				<Button
					variant="link"
					onClick={(e) => {
						e.stopPropagation();
						onFavoriteToggle(cls.id);
					}}
				>
					{isFavorite ? <FaStar color="gold" /> : <FaRegStar />}
				</Button>
				<Button
					variant="link"
					onClick={(e) => {
						e.stopPropagation();
						onSelectToggle(cls.id);
					}}
				>
					{isSelected ? (
						<FaCheckCircle color="green" />
					) : (
						<FaCircle color="gray" />
					)}
				</Button>
			</div>
		</Card.Body>
	</Card>
);

export default ClassCard;
