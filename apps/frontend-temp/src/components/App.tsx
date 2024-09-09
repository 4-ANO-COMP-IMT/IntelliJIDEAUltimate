import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Classificate from './pages/Classificate';
import Header from "./Header/Header";

const App: React.FC = () => {
  return (
	<>
		<Header />
		<Router>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/classificate" element={<Classificate />} />
		</Routes>
		</Router>
	</>
  );
};

export default App;
