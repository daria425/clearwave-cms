import Index from "./pages/Index/Index";
import { useData } from "./Hooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { createContext } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import EditPage from "./pages/Edit/EditPage";

export const appContext = createContext({
  blogPosts: [],
  accessToken: "",
  refreshToken: "",
  updateAccessToken: () => {},
  updateRefreshToken: () => {},
  handleDelete: () => {},
  handlePostUpdate: () => {},
  syncImageDelete: () => {},
  isLoading: "",
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

  function handleDelete(e, error) {
    if (!error) {
      const newPosts = blogPosts.filter((post) => post._id !== e.target.id);
      setBlogPosts(newPosts);
    }
  }

  function handlePostUpdate(e, changedPost) {
    //syncs selected post update to updating the allblogposts array
    const newPosts = blogPosts.map((post) =>
      post._id === e.target.id ? changedPost : post
    );
    setBlogPosts(newPosts);
  }

  function syncImageDelete(e) {
    // //separate function because for images the post id is a separate data attribute
    // console.log("images syncing");
    // const newPosts = blogPosts.map((post) =>
    //   post._id === e.target.dataset.postid ? changedPost : post
    // );
    // setBlogPosts(newPosts);
    const selectedPost = blogPosts.find(
      (post) => post._id === e.target.dataset.postid
    );
    const newImages = selectedPost.image_sources.filter(
      (image) => image._id !== e.target.id
    );
    const newPost = { ...selectedPost, image_sources: newImages };
    const newPosts = blogPosts.map((post) =>
      post._id === e.target.dataset.postid ? newPost : post
    );
    setBlogPosts(newPosts);
  }
  //make new array where image id does not equal to btn id
  //change post images to new images, dont re render yet

  return (
    <appContext.Provider
      value={{
        blogPosts,
        accessToken,
        refreshToken,
        updateAccessToken,
        updateRefreshToken,
        handleDelete,
        handlePostUpdate,
        syncImageDelete,
        isLoading,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </appContext.Provider>
  );
}

export default App;
