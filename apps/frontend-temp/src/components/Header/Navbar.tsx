// src/components/NavbarComponent.tsx

import React from "react";
import { Navbar, Nav, Button, Badge } from "react-bootstrap";
import { FaBars, FaExclamationCircle, FaBell, FaSignOutAlt } from "react-icons/fa"; // Importa o ícone de logout
import { logoStyle, navTextStyle, buttonStyle, badgeStyle } from "./styles";
import { useAuth } from '../../contexts/AuthContext'; // Usa o hook de autenticação
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
	handleShow: () => void;
}

const NavbarComponent: React.FC<NavbarProps> = ({ handleShow }) => {
	const { logout } = useAuth(); // Usa o hook useAuth para obter a função logout
	const navigate = useNavigate();

	// Função de logout
	const handleLogout = () => {
		logout(); // Executa o logout do contexto de autenticação
		navigate('/sign-in'); // Redireciona para a página de login
	};

	return (
		<Navbar bg="dark" variant="dark" className="px-3">
			<Nav>
				<FaBars
					style={{
						color: "green",
						fontSize: "1.5em",
						cursor: "pointer"
					}}
					onClick={handleShow}
				/>
			</Nav>
			<img
				src="/icons/LOGO-1920w.webp"
				alt="Logo da Empresa"
				style={logoStyle}
			/>
			<Navbar.Text className="mx-auto" style={navTextStyle}>
				Sistema Geral de Classificação (SGC)
			</Navbar.Text>
			<Nav className="ml-auto d-flex align-items-center gap-2">
				{/* <Button variant="success" className="mr-5">
					Metas
				</Button>
				<Button variant="success" className="mr-5" style={buttonStyle}>
					<FaExclamationCircle
						style={{ color: "white", fontSize: "1.2em" }}
					/>
					<Badge
						pill
						bg="danger"
						style={{ ...badgeStyle, top: "0", right: "0" }}
					>
						3
					</Badge>
				</Button>
				<Button variant="warning" className="mr-2" style={buttonStyle}>
					<FaBell style={{ color: "white", fontSize: "1.2em" }} />
					<Badge
						pill
						bg="danger"
						style={{ ...badgeStyle, top: "0", right: "0" }}
					>
						10
					</Badge>
				</Button> */}

				{/* Botão de Logout */}
				<Button variant="danger" className="ml-3" onClick={handleLogout}>
					<FaSignOutAlt style={{ color: "white", fontSize: "1.2em" }} />
				</Button>
			</Nav>
		</Navbar>
	);
};

export default NavbarComponent;
