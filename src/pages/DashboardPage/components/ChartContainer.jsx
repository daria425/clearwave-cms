import { blog_analytics } from "../../../helpers/mock-data";
import { useState } from "react";
import Chart from "./Chart";
export default function ChartContainer() {
  const [data, setData] = useState(blog_analytics);
  return (
    <div className="chart-container">
      <h1>Recent views:</h1>
      <div className="chart-container--chart-area">
        <Chart data={data} />
      </div>
    </div>
  );
}
