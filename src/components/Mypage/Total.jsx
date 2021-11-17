import React from "react";
import PieChart from "./PieChart";

const Total = ({ loading = true }) => {
	return (
    <div>
      {/* <PieChart data={}/> */}
      <table className="table coinlist-table table-striped table-hover text-center">
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
                <span>평가 금액</span>
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
