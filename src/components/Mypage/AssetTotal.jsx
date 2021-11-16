import React, { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios';
import Asset from './Asset'

const AssetTotal = () => {
  const [assets, setAssets] = useState([]);
	const [assetsDisplay, setAssetsDisplay] = useState([]);

  const { data1, loading1, error1 } = useAxios({
		method: "GET",
		baseURL: 'http://localhost:5000',
		url: "upbit/account",
	});
  const { data2, loading2, error2 } = useAxios({
		method: "GET",
		baseURL: 'http://localhost:5000',
		url: "binance/account",
	});

	useEffect(() => {
		if (!loading1 && data1) {
			setAssets(data1);
      console.log(data1);
			setAssetsDisplay(data1.slice(0, 10));
		}
	}, [data1, loading1]);

  return (
    <>
      <table className="table coinlist-table table-striped table-hover text-center">
				<thead className="text-light bg-success ">
					<tr>
						<th>
							<span>#</span>
						</th>
						<th>
							<span>보유 코인</span>
						</th>
						<th>
							<span>매수 평균가</span>
						</th>
						<th>
							<span>보유 수량</span>
						</th>
						<th>
							<span>평가 금액</span>
						</th>
						<th>
							<span>매수 금액</span>
						</th>
						<th>
							<span>평가 수익</span>
						</th>
						<th>
							<span>수익률</span>
						</th>
					</tr>
				</thead>
				<tbody className="table-dark">
					{loading1 && <tr><td colSpan={9}><h1 className="text-center">Loading...</h1></td></tr>}
					{assetsDisplay.map((asset, index) => (
						<Asset key={asset.id} asset={asset} index={index + 1} />
					))}
				</tbody>
			</table>
    </>
  )
}

export default AssetTotal
