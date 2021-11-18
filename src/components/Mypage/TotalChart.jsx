import React, { useEffect } from 'react'
import { Chart, registerables } from "chart.js";
import { colorArray } from './colors';
Chart.register(...registerables);

function getDetails (arr) {
  let coins = [];
  let amount = [];
  let length = arr.length;
  arr.forEach(el => {
    coins = [...coins, el.currency]
    amount = [...amount, el.balance]
  })
  return {coins, amount, length}
}

const TotalChart = ({assets}) => {
  const upbit = assets.filter(el => el.exchange === 'upbit');
  const binance = assets.filter(el => el.exchange === 'binance');
  
  const upbitAssets = getDetails(upbit) 
  const binanceAssets = getDetails(binance) 
  
  useEffect(()=>{
    console.log(assets);
  }, [assets])

  const data = {
    labels: upbitAssets.coins,
    datasets: [
      {
        label: 'Dataset 1',
        data: upbitAssets.amount,
        backgroundColor: colorArray,
      }
    ]
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '보유 자산 포트폴리오(평가 금액)'
        }
      }
    },
  };
  useEffect(()=>{
    const ctx = document.getElementById("pieChart");
    const pieChart = new Chart(ctx, config);
    return () => {
      pieChart.destroy();
    }
  })
  return (
    <div>
      <canvas id="pieChart" width={250} height={250}/>
    </div>
  )
}

export default TotalChart
