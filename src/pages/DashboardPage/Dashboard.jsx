import Layout from "../PageComponents/Layout";
import PageHeading from "../PageComponents/PageHeading";
import HelpModal from "./components/HelpModal";
import { useTokenRefresh } from "../../helpers/Hooks";
import { useContext, useState, useEffect } from "react";
import { appContext, contentContext } from "../../App";
import { Outlet } from "react-router-dom";
import Overlay from "../PageComponents/Overlay";
import {
  sumObjectProps,
  sortPostsbyGreatestValue,
} from "../../helpers/helper-functions";
export default function Dashboard() {
  const { blogPosts, postsLoading } = useContext(contentContext);
  const { accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  const [dataReady, setDataReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [top, setTop] = useState({});
  const modalText = {
    heading: "AI Assitance",
    body: "Press any of the buttons to open a chat window and get blogging help from an AI Assistant.",
    list: [
      {
        heading: "Content ideas",
        body: "Generate an intial content strategy, tailored to your blog topic/theme",
      },
      {
        heading: "Keyword research",
        body: "Conduct comprehensive keyword research for your blog topic/theme ",
      },
    ],
  };
  useTokenRefresh(accessToken, updateAccessToken, refreshToken);
  useEffect(() => {
    if (blogPosts.length > 0) {
      setTop({
        top_post: sortPostsbyGreatestValue(blogPosts, "likes"),
      });
      setDataReady(true);
    }
  }, [blogPosts]);

  function handleModal() {
    console.log("btn clicked");
    setModalOpen(!modalOpen);
  }
  const outletContext = {
    blogPosts,
    top,
    widgetFunctions: { sumObjectProps },
    buttonFunctions: { handleModal },
  };

  return (
    <Layout>
      {dataReady && (
        <section className="content">
          <PageHeading heading={"Dashboard"} />
          {modalOpen && (
            <HelpModal modalText={modalText} handleModal={handleModal} />
          )}
          <Outlet context={outletContext} />
          {modalOpen && <Overlay />}
        </section>
      )}
    </Layout>
  );
}
