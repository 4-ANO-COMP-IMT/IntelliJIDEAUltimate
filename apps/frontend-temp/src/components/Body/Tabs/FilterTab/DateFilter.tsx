import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateFilter: React.FC = () => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	return (
		<Form.Group controlId="dateFilter">
			<Form.Label>Data</Form.Label>
			<Row>
				<Col>
					<Form.Label>Início</Form.Label>
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						className="form-control"
						placeholderText="Data de Início"
					/>
				</Col>
				<Col>
					<Form.Label>Fim</Form.Label>
					<DatePicker
						selected={endDate}
						onChange={(date) => setEndDate(date)}
						className="form-control"
						placeholderText="Data de Fim"
					/>
				</Col>
			</Row>
		</Form.Group>
	);
};

export default DateFilter;
