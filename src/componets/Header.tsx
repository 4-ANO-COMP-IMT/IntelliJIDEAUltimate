import React, { useState } from 'react';
import { Navbar, Nav, Button, Badge, Offcanvas } from 'react-bootstrap';
import { FaBars, FaExclamationCircle, FaBell , FaHome, FaTachometerAlt, FaBox, FaUsers, FaClipboardList} from 'react-icons/fa';


const Header: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="px-3">
        <Nav>
          <FaBars style={{ color: 'green', fontSize: '1.5em', cursor: 'pointer' }} onClick={handleShow} />
        </Nav>
        <img src="/icons/LOGO-1920w.webp" alt="Logo da Empresa" style={{ height: '50px', marginRight: 'auto', marginLeft: '10px' }} />
        <Navbar.Text className="mx-auto" style={{ color: 'white', fontSize: '1.5em' }}>
          Sistema Geral de Classificação (SGC)
        </Navbar.Text>
        <Nav className="ml-auto d-flex align-items-center">
          <Button variant="success" className="mr-5">Metas</Button> {/* Aumentei a margem direita para 'mr-5' */}
          <Button variant="success" className="mr-5" style={{ position: 'relative' }}> {/* Aumentei a margem direita para 'mr-5' */}
            <FaExclamationCircle style={{ color: 'white', fontSize: '1.2em' }} />
            <Badge pill bg="danger" style={{ position: 'absolute', top: '-5px', right: '-5px' }}>3</Badge>
          </Button>
          <Button variant="warning" className="mr-2" style={{ position: 'relative' }}>
            <FaBell style={{ color: 'white', fontSize: '1.2em' }} />
            <Badge pill bg="danger" style={{ position: 'absolute', top: '-5px', right: '-5px' }}>10</Badge>
          </Button>
        </Nav>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column bg-dark h-100 p-3">
            <Nav.Link href="#home" className="text-white">
              <FaHome className="mr-2" /> Home
            </Nav.Link>
            <Nav.Link href="#dashboard" className="text-white">
              <FaTachometerAlt className="mr-2" /> Dashboard
            </Nav.Link>
            <Nav.Link href="#orders" className="text-white">
              <FaClipboardList className="mr-2" /> Orders
            </Nav.Link>
            <Nav.Link href="#products" className="text-white">
              <FaBox className="mr-2" /> Products
            </Nav.Link>
            <Nav.Link href="#customers" className="text-white">
              <FaUsers className="mr-2" /> Customers
            </Nav.Link>
            <div className="mt-auto">
              <div className="d-flex align-items-center text-white">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="rounded-circle mr-2"
                  width="40"
                  height="40"
                />
                <span>mdo</span>
              </div>
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
