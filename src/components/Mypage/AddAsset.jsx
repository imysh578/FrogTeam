import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Col, Form, Row } from "react-bootstrap";


const baseUrl = "http://localhost:5000";

const FormG = ({ onChange, text, type }) => {
	return (
		<Form.Group as={Row} className="mb-3">
			<Form.Label column sm="2">
				{text}
			</Form.Label>
			<Col sm="10">
				<Form.Control required onChange={onChange} type={type} />
			</Col>
		</Form.Group>
	);
};

const AddAsset = ({ onHide }) => {
	const [exchange, setExchange] = useState("Upbit");
	const [coinName, setCoinName] = useState("");
	const [amount, setAmount] = useState(0);
	const [buyPrice, setBuyPrice] = useState(0);

	const exchangeOnChange = (e) => {
		setExchange(e.target.value);
		console.log(e.target.value);
	};
	const coinNameOnChange = (e) => {
		setCoinName(e.target.value);
	};
	const amountOnChange = (e) => {
		setAmount(e.target.value);
	};
	const buyPriceOnChange = (e) => {
		setBuyPrice(e.target.value);
	};

	const handleSubmitOnClick = async (e) => {
		e.preventDefault();
		const data = {
			exchange: exchange.toUpperCase(),
			coinName,
			amount,
			buyPrice,
		};
		const result = await axios.post(`${baseUrl}/assets/create`, data);
	};

	return (
		<>
			<Modal.Body>
				<Form>
					<Form.Select onChange={exchangeOnChange} as={Row} className="mb-3">
						<option>Binance</option>
						<option selected>Upbit</option>
					</Form.Select>
					<FormG onChange={coinNameOnChange} text="코인 이름" type="text" />
					<FormG onChange={amountOnChange} text="보유 수량" type="number" />
					<FormG
						onChange={buyPriceOnChange}
						text="매수 평균가 (원)"
						type="number"
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
					<div className="d-flex justify-content-end">
						<Button
							className="mx-1"
							onClick={handleSubmitOnClick}
							variant="primary"
							type="submit"
						>
							확인
						</Button>
						<Button
							className="mx-1"
							onClick={onHide}
							variant="danger"
							type="submit"
						>
							취소
						</Button>
					</div>
			</Modal.Footer>
		</>
	);
};

export default AddAsset;
