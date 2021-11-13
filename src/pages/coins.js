import React, { useEffect, useState } from 'react'
import ChartSection from '../components/ChartSection'

const Coin = () => {
  const [data, setData] = useState();

  const callAPI = async () => {
    try {
			const url = 'http://localhost:3000/coingecko'
      const response = await fetch(url);
      // const body = await response.json()
      // setData(response)
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log('*********** server data transfer test ***********');
    callAPI()
  }, [])

  return (
    <>
      <ChartSection />
    </>
  )
}

export default Coin
