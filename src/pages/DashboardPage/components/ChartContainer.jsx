import { blog_analytics } from "../../../helpers/mock-data";
import { useState } from "react";
import Chart from "./Chart";
export default function ChartContainer() {
  const [data, setData] = useState(blog_analytics);
  return (
    <div className="chart-container">
      <h2>Site visits:</h2>
      <div className="chart-container--chart-area">
        <Chart data={data} />
      </div>
    </div>
  );
}
