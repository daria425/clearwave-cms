import { useState } from "react";
import { useEffect } from "react";

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

export { useData };
