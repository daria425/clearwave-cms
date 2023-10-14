import Index from "./pages/Index/Index";
import { useData } from "./Hooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { createContext } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";

export const appContext = createContext({
  blogPosts: [],
  accessToken: "",
  refreshToken: "",
  updateAccessToken: () => {},
  updateRefreshToken: () => {},
  handleDelete: () => {},
});

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const { data, error, isLoading } = useData("api/posts");
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    if (!isLoading) {
      setBlogPosts(data);
    }
  }, [data, isLoading]);
  function updateAccessToken(newToken) {
    setAccessToken(newToken);
  }
  function updateRefreshToken(newToken) {
    setRefreshToken(newToken);
  }

  function handleDelete(e) {
    const newPosts = blogPosts.filter((post) => post._id !== e.target.id);
    setBlogPosts(newPosts);
  }
  return (
    <appContext.Provider
      value={{
        blogPosts,
        accessToken,
        refreshToken,
        updateAccessToken,
        updateRefreshToken,
        handleDelete,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/dashboard"
            element={<Dashboard isLoading={isLoading} />}
          />
        </Routes>
      </BrowserRouter>
    </appContext.Provider>
  );
}

export default App;
