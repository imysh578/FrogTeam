import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Asset from './Asset'

const Mypage = () => {
  const [assets, setAssets] = useState([]);

  const handleAddOnclick = () => {
    console.log('자산 추가 버튼 클릭!');
  }

  return (
    <div className='Mypage-Container'>
      <div className = 'asset-list'>
        <Asset />
      </div>
      <Button onClick={handleAddOnclick} variant="success">
					추가
			</Button>
    </div>
  )
}

export default Mypage
