export const chartCofig1 = {
	type: "line",
  
	options: {
		lineHeightAnnotation: {
			always: true,
			hover: false,
			lineWeight: 1.5,
		},
    // plugins: {
    //   title: {
    //     display: true,
    //     text: 'Price Chart'
    //   }
    // },
		animation: {
			duration: 500,
		},
		maintainAspectRatio: false, // 창크기에 따라 차트 비율 유지 할건지
		responsive: true,
		scales: {
			xAxes: {
				type: "time",
			},
		},
	},
};
