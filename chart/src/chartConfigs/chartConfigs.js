export const historyOptions = {
	lineHeightAnnotation: {
		always: true,
		hover: false,
		lineWeight: 1.5,
	},
  
	animation: {
		duration: 2000,
	},
	maintainAspectRatio: false, // 창크기에 따라 차트 비율 유지 할건지
	responsive: true,
	scales: {
    xAxes: {
			type: "time",
			time: {
				unit: "hour",
			},
		},
	},
};
