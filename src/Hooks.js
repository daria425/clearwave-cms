import { useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

function useTokenRefresh(accessToken, refreshToken, updateAccessToken) {
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
              const newToken = await response.json();
              updateAccessToken(newToken);
            } else {
              throw new Error(
                `Refresh failed with status code ${response.status}`
              );
            }
          }
        }
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }

    refreshAccessToken();
  }, [accessToken, refreshToken, updateAccessToken]);

  return {};
}
function useData(query) {
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let ignore = false;

    async function startFetching() {
      try {
        const json = await fetch(`http://localhost:3000/${query}`);
        const data = await json.json();
        if (!ignore) {
          console.log(data);
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

export { useData, useTokenRefresh };
