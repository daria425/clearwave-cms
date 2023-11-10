import SquareWidget from "./SquareWidget";
import AIButtons from "./AIButtons";
import PageHeading from "../../PageComponents/PageHeading";
import TopPostWidget from "./TopPostWidget";
export default function DashboardGrid({ widgetFunctions, blogPosts, top }) {
  return (
    <section className="dashboard-grid">
      <PageHeading heading={"Dashboard"} />
      <SquareWidget
        widgetTitle={"Total Likes:"}
        widgetContent={widgetFunctions.sumObjectProps(blogPosts, "likes")}
      />
      <TopPostWidget post={top.top_post} />

      <AIButtons handlerFunction={widgetFunctions.handleContentGPTQuery} />
    </section>
  );
}
