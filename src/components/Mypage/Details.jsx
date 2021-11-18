import React, { useState } from 'react'
import { Button, ButtonGroup } from "react-bootstrap";
import AssetList from "./AssetList";
import EditAsset from './EditAsset';
import ModalComponent from './ModalComponent';

const Details = ({handleTabClick, loading, assets}) => {
	const [modalShow, setModalShow] = useState(false);
	const [editShow, setEditShow] = useState(false);

	const handleEditClick = () => {
		setEditShow(!editShow)
		// setModalShow(!modalShow)
	}
	const handleModalShow = () => {
		setModalShow(!modalShow)
	}
  return (
		<>
			<div class="d-flex justify-content-between">
				<ButtonGroup className="mb-2">
					<Button className="tab" onClick={handleTabClick} variant="success">
						Total
					</Button>
					<Button className="tab" onClick={handleTabClick} variant="primary">
						Upbit
					</Button>
					<Button className="tab" onClick={handleTabClick} variant="warning">
						Binance
					</Button>
				</ButtonGroup>
				<ButtonGroup className="mb-2 float-right">
					<Button variant="primary" onClick={handleEditClick}>
						{editShow ? '되돌아가기' : '자산 수정' }
					</Button>
				</ButtonGroup>
			</div>
			<ModalComponent show={modalShow} onHide={handleModalShow}>
				<EditAsset/>
			</ModalComponent>
			<div className="total">
				<AssetList loading={loading} assets={assets} editShow={editShow}/>
			</div>
		</>
	);
}

export default Details
