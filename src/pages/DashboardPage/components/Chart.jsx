import { scaleLinear, scaleUtc } from "@visx/scale";
import { GridRows, GridColumns } from "@visx/grid";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { LinePath } from "@visx/shape";
import { extent } from "d3-array";
import { timeDay } from "d3-time";
import {
  primary500,
  primary050,
} from "../../../assets/styles/modules/_variables.module.scss";
import { timeFormat } from "d3-time-format";
import { Group } from "@visx/group";
export default function Chart({ data, width, height }) {
  const margin = { top: 20, right: 40, bottom: 20, left: 40 };
  // defining inner measurements
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const dateFormatter = timeFormat("%b %d");
  //accessor functions
  const getRD = (d) => d.page_views;
  const getDate = (d) => new Date(d.date);
  const timeScale = scaleUtc({
    range: [0, innerWidth],
    domain: extent(data, getDate),
    nice: false,
  });

  // vertical, y scale
  const rdScale = scaleLinear({
    range: [innerHeight, 0],
    domain: extent(data, getRD),
    nice: true,
  });
  return width <= 0 || height <= 0 ? null : ( //renders with 0 as height first, make it not do that
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={primary500}
        rx={3}
      />
      <Group left={margin.left} top={margin.top}>
        <rect
          x={0}
          y={0}
          width={innerWidth}
          height={innerHeight}
          fill={primary050}
          rx={3}
        />
        <GridRows
          scale={rdScale}
          width={innerWidth}
          height={innerHeight - margin.top}
          stroke="#000"
          strokeOpacity={0.2}
        />
        <GridColumns
          scale={timeScale}
          width={innerWidth}
          height={innerHeight}
          stroke="#000"
          strokeOpacity={0.2}
        />
        <AxisLeft
          tickTextFill={"#000"}
          stroke={"#000"}
          tickStroke={"#000"}
          scale={rdScale}
          tickLabelProps={() => ({
            fill: "#000",
            fontSize: 11,
            textAnchor: "end",
          })}
        />

        <AxisBottom
          scale={timeScale}
          stroke={"#000"}
          tickStroke={"#000"}
          tickFormat={dateFormatter}
          numTicks={data.length}
          tickTextFill={"#000"}
          top={innerHeight}
          tickLabelProps={() => ({
            fill: "#000",
            fontSize: 11,
            textAnchor: "middle",
          })}
        />

        <LinePath
          stroke={"#000"}
          strokeWidth={3}
          data={data}
          x={(d) => timeScale(getDate(d)) ?? 0}
          y={(d) => rdScale(getRD(d)) ?? 0}
        />
      </Group>
    </svg>
  );
}
