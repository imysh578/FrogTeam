import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Coin from './Coin'
import CoinList from './CoinList'

const Coingecko = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CoinList/>} exact />
        <Route path="/:id" element={<Coin />} exact />
      </Routes>
    </>
  )
}

export default Coingecko
