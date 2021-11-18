import React from 'react'
import { Button, ButtonGroup } from "react-bootstrap";
import AssetList from "./AssetList";

const Details = ({handleEditClick, handleTabClick, loading, assets}) => {
	console.log(assets);
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
					<Button onClick={handleEditClick} variant="danger">
						자산 수정
					</Button>
				</ButtonGroup>
			</div>
			<div className="total">
				<AssetList
					loading={loading}
					assets={assets}
				/>
			</div>
    </>
  )
}

export default Details
