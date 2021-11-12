export const chartCofig1 = {
	type: "line",
  
	options: {
		lineHeightAnnotation: {
			always: true,
			hover: false,
			lineWeight: 1.5,
		},
    plugins: {
      title: {
        display: true,
        text: 'Price Chart'
      }
    },
		animation: {
			duration: 500,
		},
		maintainAspectRatio: false, // 창크기에 따라 차트 비율 유지 할건지
		responsive: true,
		scales: {
			x: {
				type: "time",
			},
			y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      // y1: {
      //   type: 'linear',
      //   display: true,
      //   position: 'right',
      //   // grid line settings
      //   grid: {
      //     drawOnChartArea: false, // 두번째 그리드 라인 숨기기
      //   },
      // },
		},
	},
};
export const chartCofig2 = {
	type: "line",
  
	options: {
		lineHeightAnnotation: {
			always: true,
			hover: false,
			lineWeight: 1.5,
		},
		animation: {
			duration: 500,
		},
		maintainAspectRatio: false,
		responsive: true,
		scales: {
			x2: {
				type: "time",
			},
		},
	},
};
