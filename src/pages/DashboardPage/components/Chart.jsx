import { blog_analytics } from "../../../helpers/mock-data";
import { useState } from "react";
import {
  primary,
  primary500,
  primary050,
} from "../../../assets/styles/modules/_variables.module.scss";
import { Group } from "@visx/group";
export default function Chart({ width, height }) {
  console.log("chart mounting");
  // const [data, setData] = useState(blog_analytics);
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  // defining inner measurements
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  return width <= 0 || height <= 0 ? null : (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={primary500}
        rx={14}
      />
      <Group left={margin.left} top={margin.top}>
        <rect
          x={0}
          y={0}
          width={innerWidth}
          height={innerHeight}
          fill={primary050}
        />
      </Group>
    </svg>
  );
}
