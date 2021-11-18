import React from "react";
import TotalChart from "./TotalChart";

function totalAsset (arr) {
  let total = 0;
  arr.forEach(el => {
    total +=  el.balance * el.price
  });
  return total
}

const Total = ({ loading = true, assets }) => {
	return (
    <div>
      <TotalChart assets={assets}/>
      <table className="table coinlist-table table-striped table-hover text-center mt-4">
        <thead className="text-light bg-success ">
          <tr>
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
          {loading ? (
            <tr>
              <td colSpan={4}>
                <h1 className="text-center">Loading...</h1>
              </td>
            </tr>
          ) : (
            <tr>
              <td>
                <span>{totalAsset(assets).toFixed(0)} 원</span>
              </td>
              <td>
                <span>매수 금액</span>
              </td>
              <td>
                <span>평가 수익</span>
              </td>
              <td>
                <span>수익률</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
	);
};

export default Total;
