import React, { useState } from "react";
import {
	Form,
	Button,
	ToggleButton,
	ToggleButtonGroup,
	Card
} from "react-bootstrap";
import { FaStar, FaRegStar, FaCheckCircle, FaCircle } from "react-icons/fa";

const classList = [
	{ id: 0, label: "Lombada" },
	{ id: 1, label: "Sarjetão" },
	{ id: 2, label: "Buraco" },
	{ id: 3, label: "Tampa de PV Adequada" },
	{ id: 4, label: "Tampa de PV com Defeito" },
	{ id: 5, label: "Recomposição Asfáltica" },
	{ id: 6, label: "Fissura Couro de Jacaré" },
	{ id: 7, label: "Fissura Transversal" },
	{ id: 8, label: "Fissura Longitudinal" },
	{ id: 9, label: "Boca de Lobo" },
	{ id: 10, label: "Sarjeta/Drenagem com Defeito" },
	{ id: 11, label: "Placa de Regulamentação" },
	{ id: 12, label: "Placa de Advertência" },
	{ id: 13, label: "Placa De Indicação" },
	{ id: 14, label: "Placa Educativa" },
	{ id: 15, label: "Placa Auxiliar" },
	{ id: 16, label: "Lixeira" },
	{ id: 17, label: "Hidrante" },
	{ id: 18, label: "Paralelepípedo" },
	{ id: 19, label: "Boca de Leão" },
	{ id: 20, label: "Sombra" },
	{ id: 21, label: "Tachão" },
	{ id: 22, label: "N/A" },
	{ id: 23, label: "Sinalização Horizontal" },
	{ id: 24, label: "Placa" },
	{ id: 25, label: "Fissura" },
	{ id: 26, label: "Tampa de PV" },
	{ id: 27, label: "Boca de Lobo Adequada" },
	{ id: 28, label: "Boca de Lobo Inadequada" },
	{ id: 29, label: "Sarjetão Adequado" },
	{ id: 30, label: "Sarjetão Inadequado" },
	{ id: 31, label: "Buraco Profundo" },
	{ id: 32, label: "Buraco Superficial" },
	{ id: 33, label: "Entulho" },
	{ id: 34, label: "Faixa de Pedestre" },
	{ id: 35, label: "Poste" },
	{ id: 36, label: "Lixeira Adequada" },
	{ id: 37, label: "Lixeira Inadequada" },
	{ id: 38, label: "Lixeira Transbordando" },
	{ id: 39, label: "Galhardete" },
	{ id: 40, label: "Saco de Varrição" },
	{ id: 41, label: "Sarjeta" },
	{ id: 42, label: "Tacha Refletiva" },
	{ id: 43, label: "Trinca Selada" },
	{ id: 44, label: "Defensa Metálica" },
	{ id: 45, label: "Mato Baixo" },
	{ id: 46, label: "Mato Alto" },
	{ id: 49, label: "Grama na Sarjeta" },
	{ id: 50, label: "Árvore" },
	{ id: 51, label: "Rua" },
	{ id: 52, label: "Calçada" },
	{ id: 53, label: "Canteiro" },
	{ id: 54, label: "Partes do Carro" },
	{ id: 55, label: "Reflexo" },
	{ id: 56, label: "Fundo" },
	{ id: 57, label: "Background" },
	{ id: 80, label: "Marco Vertical" },
	{ id: 81, label: "Válvula Gás" },
	{ id: 82, label: "Poste ERP" },
	{ id: 999002, label: "Árvores" },
	{ id: 999003, label: "Excesso de fio" }
];

const ClassToggleList: React.FC = () => {
	const [selectedClass, setSelectedClass] = useState<number | null>(null);
	const [favoriteClasses, setFavoriteClasses] = useState<number[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSelectClass = (id: number) => {
		setSelectedClass(id);
	};

	const toggleFavorite = (id: number) => {
		setFavoriteClasses((prev) =>
			prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
		);
	};

	const filteredClasses = classList.filter(
		(cls) =>
			cls.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
			cls.id.toString().includes(searchTerm)
	);

	return (
		<div
			style={{
				height: "100%",
				overflowY: "auto",
				padding: "1rem",
				backgroundColor: "#f8f9fa"
			}}
		>
			<Form.Control
				type="text"
				placeholder="Buscar classes..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="mb-2"
			/>
			<h5>Favoritos</h5>
			{favoriteClasses.length === 0 && <div>Nenhum favorito</div>}
			<div className="mb-3">
				{favoriteClasses.map((favId) => {
					const cls = classList.find((c) => c.id === favId);
					if (!cls) return null;
					return (
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
											toggleFavorite(cls.id);
										}}
									>
										<FaStar color="gold" />
									</Button>
									<Button
										variant="link"
										onClick={(e) => {
											e.stopPropagation();
											handleSelectClass(cls.id);
										}}
									>
										{selectedClass === cls.id ? (
											<FaCheckCircle color="green" />
										) : (
											<FaCircle color="gray" />
										)}
									</Button>
								</div>
							</Card.Body>
						</Card>
					);
				})}
			</div>

			<h5>Prováveis</h5>
			<div>Placeholder para Prováveis</div>

			<h5>Todas as Classes</h5>
			<div>
				{filteredClasses.map((cls) => (
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
										toggleFavorite(cls.id);
									}}
								>
									{favoriteClasses.includes(cls.id) ? (
										<FaStar color="gold" />
									) : (
										<FaRegStar />
									)}
								</Button>
								<Button
									variant="link"
									onClick={(e) => {
										e.stopPropagation();
										handleSelectClass(cls.id);
									}}
								>
									{selectedClass === cls.id ? (
										<FaCheckCircle color="green" />
									) : (
										<FaCircle color="gray" />
									)}
								</Button>
							</div>
						</Card.Body>
					</Card>
				))}
			</div>
		</div>
	);
};

export default ClassToggleList;
