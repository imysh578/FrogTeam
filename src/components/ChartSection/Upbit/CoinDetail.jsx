import React from 'react'
import { useParams } from 'react-router-dom'

const CoinDetail = () => {
  const coinName = useParams();
  return (
    <div>
      {coinName}
    </div>
  )
}

export default CoinDetail
