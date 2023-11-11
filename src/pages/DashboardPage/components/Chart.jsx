import { blog_analytics } from "../../../helpers/mock-data";
import { useState } from "react";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";

export default function Chart() {
  const [data, setData] = useState(blog_analytics);
  const width = 750;
  const height = 400;
  const margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80,
  };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  function x(d) {
    return new Date(d.date);
  }
  function y(d, xProp) {
    return d[xProp];
  }
  //   console.log(x(data[0]));
  //   console.log(y(data[0], "page_views"));
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
  });
  return (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        <AxisLeft
          scale={yScale}
          top={0}
          left={0}
          label={"Close Price ($)"}
          stroke={"#1b1a1e"}
          tickTextFill={"#1b1a1e"}
        />
        <AxisBottom
          scale={xScale}
          top={yMax}
          label={"Years"}
          stroke={"#1b1a1e"}
          tickTextFill={"#1b1a1e"}
        />
        <AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          fill={"red"}
        />
      </Group>
    </svg>
  );
}
