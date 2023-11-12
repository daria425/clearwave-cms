import Layout from "../PageComponents/Layout";
import PageHeading from "../PageComponents/PageHeading";
import DashboardGrid from "./components/DashboardGrid";
import { useTokenRefresh } from "../../helpers/Hooks";
import { useContext, useState, useEffect } from "react";
import { appContext, contentContext } from "../../App";
import {
  sumObjectProps,
  sortPostsbyGreatestValue,
} from "../../helpers/helper-functions";
export default function Dashboard() {
  const { blogPosts, postsLoading } = useContext(contentContext);
  const { accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  const [dataReady, setDataReady] = useState(false);
  const [userTheme, setUserTheme] = useState(["Finance"]);
  const [top, setTop] = useState({});
  useTokenRefresh(accessToken, updateAccessToken, refreshToken);
  useEffect(() => {
    if (blogPosts.length > 0) {
      setTop({
        top_post: sortPostsbyGreatestValue(blogPosts, "likes"),
      });
      setDataReady(true);
    }
  }, [blogPosts]);

  async function handleContentGPTQuery(e) {
    e.preventDefault();

    try {
      const theme = JSON.stringify(userTheme);
      const response = await fetch(
        "http://localhost:3000/api/gpt/content-ideas",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            "x-api-key": "svintus", // Include your API key
          },
          body: JSON.stringify({
            theme: theme,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const content = JSON.parse(data.message.content);
        console.log(content);
      } else {
        throw new Error(
          `Server response failed with status code: ${response.statusText}`
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Layout>
      {dataReady > 0 && (
        <section className="content">
          <PageHeading heading={"Dashboard"} />
          <DashboardGrid
            widgetFunctions={{ sumObjectProps, handleContentGPTQuery }}
            blogPosts={blogPosts}
            top={top}
          />
        </section>
      )}
    </Layout>
  );
}
