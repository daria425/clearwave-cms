import { useEffect } from "react";
import Chart from "./Chart";
import { ParentSize } from "@visx/responsive";
export default function ChartContainer() {
  return (
    <div className="chart-container">
      <ParentSize enableDebounceLeadingCall={false}>
        {({ width, height }) => (
          <Chart data={{}} width={width} height={height} />
        )}
      </ParentSize>
    </div>
  );
}
