// src/components/NavbarComponent.tsx

import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { logoStyle, navTextStyle, buttonStyle } from "./styles";
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

    // Função para navegar para Home
    const handleNavigateHome = () => {
        navigate('/welcome'); // Navega para a página inicial
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
            <Container fluid>
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
                <Navbar.Brand onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
                    <img
                        src="/icons/LOGO-1920w.webp"
                        alt="Logo da Empresa"
                        style={logoStyle}
                    />
                </Navbar.Brand>
                <Navbar.Text style={{ ...navTextStyle, flex: 1, textAlign: 'center' }}>
                    Sistema Geral de Classificação (SGC)
                </Navbar.Text>
                <Nav className="ml-auto d-flex align-items-center">
                    {/* Botão de Logout */}
                    <Button variant="danger" onClick={handleLogout}>
                        <FaSignOutAlt style={{ color: "white", fontSize: "1.2em" }} />
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
