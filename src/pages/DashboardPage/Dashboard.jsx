import Layout from "../PageComponents/Layout";
import ChatButton from "./components/ChatButton";
import PageHeading from "../PageComponents/PageHeading";
import { useTokenRefresh } from "../../helpers/Hooks";
import { useContext, useState } from "react";
import { appContext } from "../../App";

export default function Dashboard() {
  const { accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  const [userTheme, setUserTheme] = useState(["Finance"]);
  useTokenRefresh(accessToken, updateAccessToken, refreshToken);

  async function handleGPTQuery(e) {
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
      <PageHeading heading={"Dashboard"} />
      <p>hi nothing here yet</p>
      <ChatButton handlerFunction={handleGPTQuery} />
    </Layout>
  );
}
