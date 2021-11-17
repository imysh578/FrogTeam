import React from "react";
import Asset from "./Asset";

const AssetList = ({ loading, assets }) => {
	
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
					{loading && (
						<tr>
							<td colSpan={9}>
								<h1 className="text-center">Loading...</h1>
							</td>
						</tr>
					)}
					{assets.map((asset, index) => (
						<Asset key={asset.currency} asset={asset} index={index + 1} />
					))}
				</tbody>
			</table>
		</>
	);
};

export default AssetList;
