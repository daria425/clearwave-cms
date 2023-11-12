import { blog_analytics } from "../../../helpers/mock-data";
import { useState } from "react";
import Chart from "./Chart";
export default function ChartContainer() {
  const [data, setData] = useState(blog_analytics);
  return (
    <div className="chart-container">
      <Chart data={data} />
    </div>
  );
}
