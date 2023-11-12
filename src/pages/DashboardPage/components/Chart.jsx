import { ResponsiveLine } from "@nivo/line";
import {
  primary,
  primary050,
} from "../../../assets/styles/modules/_variables.module.scss";
import format from "date-fns/format";
export default function Chart({ data }) {
  const renderData = data.map((value) => {
    return { x: format(new Date(value.date), "MMM dd"), y: value.page_views };
  });
  const dataObject = [
    {
      id: "Page views",
      data: renderData,
    },
  ];
  const chartTheme = {
    "axis": {
      "ticks": {
        "text": {
          "fill": "#fff",
          "fontSize": "clamp(0.75rem, 0.6364rem + 0.4848vw, 1rem)",
        },
        "line": {
          "stroke": "#ffffff",
          "strokeWidth": 1,
        },
      },
      "domain": {
        "line": {
          "stroke": "#ffffff",
          "strokeWidth": 1,
        },
      },
    },
  };
  return (
    <ResponsiveLine
      data={dataObject}
      theme={chartTheme}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="cardinal"
      enableGridX={false}
      enableGridY={false}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,

        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: 4,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={5}
      animate={false}
      colors={primary050}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointLabel={(d) => `${d.y}`}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-10}
    />
  );
}
