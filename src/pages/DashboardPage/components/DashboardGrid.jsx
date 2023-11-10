import SquareWidget from "./SquareWidget";
import AIButtons from "./AIButtons";
import ChartContainer from "./ChartContainer";
import TopPostWidget from "./TopPostWidget";
export default function DashboardGrid({ widgetFunctions, blogPosts, top }) {
  return (
    <section className="dashboard-grid">
      <SquareWidget
        widgetTitle={"Total Likes:"}
        widgetContent={widgetFunctions.sumObjectProps(blogPosts, "likes")}
      />
      <TopPostWidget post={top.top_post} />
      <ChartContainer />
      <AIButtons handlerFunction={widgetFunctions.handleContentGPTQuery} />
    </section>
  );
}
