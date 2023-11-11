import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import jwtDecode from "jwt-decode";
import { contentContext } from "../App";
function useTokenRefresh(accessToken, refreshToken, updateAccessToken) {
  const [error, setError] = useState(false);
  useEffect(() => {
    async function refreshAccessToken() {
      try {
        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < currentTime) {
            // Access token is expired
            console.log("Access token is expired. Refreshing...");

            const response = await fetch("http://localhost:3000/api/refresh", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`,
                "x-api-key": "svintus2",
              },
            });

            if (response.ok) {
              const { newToken, user } = await response.json();
              updateAccessToken(newToken);
            } else {
              setError(true);
              throw new Error(
                `Refresh failed with status code ${response.status}`
              );
            }
          }
        }
      } catch (err) {
        console.log(`Error: ${err}`);
        setError(true);
      }
    }

    refreshAccessToken();
  }, [accessToken, refreshToken, updateAccessToken]);

  return error;
}
function useData(query) {
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(`data refresh for : ${query}`);
    let ignore = false;

    async function startFetching() {
      try {
        const json = await fetch(`http://localhost:3000/${query}`);
        const data = await json.json();
        if (!ignore) {
          setData(data);
          setError(false);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        if (!ignore) {
          setIsLoading(false); // Set isLoading to false regardless of success or error
        }
      }
    }

    startFetching();

    return () => {
      ignore = true;
    };
  }, [query]);
  return { data, error, isLoading };
}

function useSelectedPost() {
  const [selectedPost, setSelectedPost] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);
  const { id } = useParams();
  const { blogPosts, postsLoading } = useContext(contentContext);

  useEffect(() => {
    if (!postsLoading) {
      const post = blogPosts.find((post) => post._id === id);
      setSelectedPost(post || {}); // If post is not found, set an empty object
    }
  }, [blogPosts, id, postsLoading]);

  return { selectedPost, responseLoading, setResponseLoading, setSelectedPost };
}

function useAuth() {
  const [user, setUser] = useState({});
  const [userLogin, setUserLogin] = useState(false);
  useEffect(() => {
    const cookies = document.cookie;
    if (cookies) {
      const indexToSlice = cookies.indexOf("=") + 1;
      const userData = decodeURIComponent(cookies.slice(indexToSlice));
      const userString = userData.replaceAll("j:", "");
      const userJson = `${userString}`;
      const user = JSON.parse(userJson);
      setUser(user);
      setUserLogin(true);
    }
  }, []);
  return { user, setUser, userLogin, setUserLogin };
}
export { useData, useTokenRefresh, useAuth, useSelectedPost };
