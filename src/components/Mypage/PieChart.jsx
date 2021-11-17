import React, { useEffect } from 'react'
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const DATA_COUNT = 5;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};



const PieChart = () => {
  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        // data: Utils.numbers(NUMBER_CFG),
        // backgroundColor: Object.values(Utils.CHART_COLORS),
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
          text: 'Chart.js Doughnut Chart'
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

export default PieChart
