// import Chart from 'chart.js';
import { Chart, registerables } from "chart.js";
import React, { useRef, useEffect, useState } from "react";
import { historyOptions } from "../chartConfigs/chartConfigs";
import "chartjs-adapter-moment";
Chart.register(...registerables);

const HistoryChart = ({ data }) => {
	const { day, week, year, detail } = data;
  const chartRef = useRef();
	const [timeFormat, setTimeFormat] = useState("24h");
	const [isRebuildingCanvas, setIsRebuildingCanvas] = useState(false);

  const determineTimeFormat = () => {
		switch (timeFormat) {
			case "24h":
				return day;
			case "7d":
				return week;
			case "1y":
				return year;
			default:
				return day;
		}
	};
  // timeFormat 값이 변경되면 canvas 삭제
  useEffect(()=>{
    setIsRebuildingCanvas(true);
  }, [timeFormat])
  
  // 만약 isRebuildingCanvas 값이 바뀐다면, canvas가 삭제된 상태
  // 재생성을 위해 false로 바꿈
  useEffect(()=>{
    if(isRebuildingCanvas) {
      setIsRebuildingCanvas(false);
    }
  }, [isRebuildingCanvas])

	useEffect(() => {
    const chartCanvas = chartRef.current;
    if(isRebuildingCanvas || !chartCanvas){
      return;
    }
    if (chartRef && chartRef.current && detail) {
      // const labels = day.map(el=>el.x);
      const chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
          // labels,
          datasets: [
            {
              label: `${detail.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "orange",
              borderColor: "orange",
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...historyOptions,
        },
      });
      return () => {
        chartInstance.destroy();
      }
    }
	}, [day, week, year, detail, isRebuildingCanvas, timeFormat]);

	const renderPrice = () => {
		if (detail) {
			return (
				<>
					<p className="my-0">${detail.current_price}</p>
					<p
						className={
							detail.price_change_24 < 0
								? "text-danger my-0"
								: "text-success my-0"
						}
					>
						{detail.price_change_percentage_24h.toFixed(2)}%
					</p>
				</>
			);
		}
	};

	return (
		<div className="bg-white border mt-2 rounded p-3">
			<div>{renderPrice()}</div>
			<div>
				<canvas id="myChart" ref={chartRef} width={250} height={250}></canvas>
			</div>
			<div className="chart-butoon mt-1">
				<button
					onClick={() => setTimeFormat("24h")}
					className="btn btn-outline-secondary btn-sm"
				>
					24h
				</button>
				<button
					onClick={() => setTimeFormat("7d")}
					className="btn btn-outline-secondary btn-sm mx-1"
				>
					7d
				</button>
				<button
					onClick={() => setTimeFormat("1y")}
					className="btn btn-outline-secondary btn-sm"
				>
					1y
				</button>
			</div>
		</div>
	);
};

export default HistoryChart;
