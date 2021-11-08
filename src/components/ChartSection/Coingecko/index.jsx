import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CoingeckoChart from './Chart'
import CoinDetail from './CoinDetail'
import CoingeckoCoinList from './CoinList'

const Coingecko = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CoingeckoCoinList/>} exact />
        <Route path="/:id" element={<CoinDetail />} exact />
      </Routes>
    </>
  )
}

export default Coingecko
