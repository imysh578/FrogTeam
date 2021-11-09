import React from 'react'
import { useParams } from 'react-router-dom'

const CoinDetail = () => {
  const coinName = useParams();
  console.log(coinName);
  return (
    <div>
      {coinName}
    </div>
  )
}

export default CoinDetail
