import { useEffect } from "react";
import Chart from "./Chart";
import { ParentSize } from "@visx/responsive";
import { blog_analytics } from "../../../helpers/mock-data";
import { useState } from "react";
export default function ChartContainer() {
  const [data, setData] = useState(blog_analytics);
  return (
    <div className="chart-container">
      <ParentSize enableDebounceLeadingCall={false}>
        {({ width, height }) => (
          <Chart data={data} width={width} height={height} />
        )}
      </ParentSize>
    </div>
  );
}
