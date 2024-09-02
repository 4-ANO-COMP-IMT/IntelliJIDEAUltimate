import React, { useState } from "react";
import NavbarComponent from "./Navbar";
import Sidebar from "./Sidebar";

const Header: React.FC = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<NavbarComponent handleShow={handleShow} />
			<Sidebar show={show} handleClose={handleClose} />
		</>
	);
};

export default Header;
