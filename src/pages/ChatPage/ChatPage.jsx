import Layout from "../PageComponents/Layout";
import PageHeading from "../PageComponents/PageHeading";
import Loader from "../PageComponents/Loader";
import { mockResponse } from "../../helpers/mock-data";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { appContext, contentContext } from "../../App";
import { useTokenRefresh } from "../../helpers/Hooks";
import ChatBox from "./components/ChatBox";
export default function ChatPage() {
  const { feature } = useParams(); //set the feature to use based on url params
  const [userTheme, setUserTheme] = useState("");
  const [message, setMessage] = useState(null);
  const [GPTResponse, setGPTResponse] = useState(mockResponse);
  const [loading, setLoading] = useState(false);
  const { accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  useTokenRefresh(accessToken, updateAccessToken, refreshToken);
  function handleThemeChange(e) {
    setUserTheme(e.target.value);
  }
  async function handleContentGPTQuery(e) {
    e.preventDefault();
    setLoading(true);

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
        if (content && content.content_ideas) {
          setGPTResponse(content.content_ideas);
          console.log(content.content_ideas);
        } else {
          setGPTResponse(Object.values(content));
        }
      } else {
        throw new Error(
          `Server response failed with status code: ${response.statusText}`
        );
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }
  const availableFeatures = {
    content_ideas: {
      page_heading: "Get Content Ideas",
      settings: {
        heading: "Welcome to the AI Assisted Content Idea Generator",
        instructions:
          "Simply enter the theme or topic of your blog below and recieve potential impactful posts for your topic",
        handlerFunction: handleContentGPTQuery,
      },
    },
    keyword_research: {
      page_heading: "Conduct Keyword Research",
      settings: {
        heading: "Welcome to AI Assisted Keyword Research",
        instructions:
          "Simply enter the theme or topic of your blog below and recieve a content strategy plan",
      },
    },
  };
  function handleSendMessage(msg) {
    setMessage(msg);
  }
  return (
    <Layout>
      <main className="content--chat">
        <PageHeading heading={availableFeatures[feature].page_heading} />
        <ChatBox
          settings={availableFeatures[feature].settings}
          userTheme={userTheme}
          handleThemeChange={handleThemeChange}
          loading={loading}
          GPTResponse={GPTResponse}
          message={message}
          handleSendMessage={handleSendMessage}
        />
      </main>
    </Layout>
  );
}
