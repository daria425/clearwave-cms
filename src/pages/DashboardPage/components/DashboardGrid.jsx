import SquareWidget from "./SquareWidget";
import AIButtons from "./AIButtons";
import ChartContainer from "./ChartContainer";
import TopPostWidget from "./TopPostWidget";
import { blog_data } from "../../../helpers/mock-data";
import { useOutletContext } from "react-router-dom";
export default function DashboardGrid() {
  const { widgetFunctions, blogPosts, top } = useOutletContext();
  return (
    <section className="dashboard-grid">
      <SquareWidget
        widgetLabel={"likes"}
        widgetNumber={widgetFunctions.sumObjectProps(blogPosts, "likes")}
      />
      <SquareWidget
        widgetLabel={"followers"}
        widgetNumber={blog_data.followers}
        additionalClass="--followers"
      />
      <TopPostWidget post={top.top_post} />
      <ChartContainer />
      <AIButtons handlerFunction={widgetFunctions.handleContentGPTQuery} />
    </section>
  );
}
