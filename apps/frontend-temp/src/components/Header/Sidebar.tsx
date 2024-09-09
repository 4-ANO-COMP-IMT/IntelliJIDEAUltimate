import React from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import {
	FaHome,
	FaTachometerAlt,
	FaClipboardList,
	FaBox,
	FaUsers
} from "react-icons/fa";

interface SidebarProps {
	show: boolean;
	handleClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ show, handleClose }) => {
	return (
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
	);
};

export default Sidebar;
