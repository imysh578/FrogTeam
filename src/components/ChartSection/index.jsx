import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import Coingecko from "./Coingecko";
import './index.scss'

const Contents = ({ tab }) => {
	switch (tab) {
		case "Coingecko":
			return <Coingecko />;
		case "Upbit":
			return <div>Upbit Chart</div>;

		default:
			break;
	}
};

const ChartSection = () => {
	const [tab, setTab] = useState("Coingecko");

	const handleTabClick = () => (e) => {
		console.log(e.target.innerText);
		setTab(e.target.innerText);
	};

	return (
		<div className="coins-container">
			<div>
				<ButtonGroup className="mt-2 mx-2">
					<Button className="tab" onClick={handleTabClick()} variant="success">
						Coingecko
					</Button>
					<Button className="tab" onClick={handleTabClick()} variant="primary">
						Upbit
					</Button>
				</ButtonGroup>
			</div>
			<Contents tab={tab} />
		</div>
	);
};

export default ChartSection;
