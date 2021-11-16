import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import AssetTotal from './AssetTotal';

const Mypage = () => {
  const [assets, setAssets] = useState([]);
  const [tab, setTab] = useState("Total");

  const handleAddOnclick = () => {
    console.log('자산 추가!');
  }
  const handleTabClick = () => (e) => {
		console.log(e.target.innerText);
		setTab(e.target.innerText);
	};

  return (
    <div className='Mypage-Container'>
      <div class="d-flex justify-content-between">
        <ButtonGroup className="mb-2">
          <Button className="tab" onClick={handleTabClick()} variant="success">
            Total
          </Button>
          <Button className="tab" onClick={handleTabClick()} variant="primary">
            Upbit
          </Button>
          <Button className="tab" onClick={handleTabClick()} variant="warning">
            Binance
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mb-2 float-right">
          <Button onClick={handleAddOnclick} variant="danger">
              자산 추가
          </Button>
        </ButtonGroup>
      </div>
      <div className = 'total'>
        <AssetTotal />
      </div>
    </div>
  )
}

export default Mypage
