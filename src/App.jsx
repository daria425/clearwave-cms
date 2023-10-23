import Index from "./pages/Index/Index";
import { useData } from "./Hooks";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { createContext } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import EditPage from "./pages/EditPost/EditPage";
import NewPostPage from "./pages/NewPost/NewPostPage";
export const appContext = createContext({
  blogPosts: [],
  accessToken: "",
  refreshToken: "",
  updateAccessToken: () => {},
  updateRefreshToken: () => {},
  handleDelete: () => {},
  handlePostUpdate: () => {},
  handleNewPost: () => {},
  syncImageDelete: () => {},
  categoriesLoading: "",
  postsLoading: "",
  handleLogin: () => {},
  handleLogout: () => {},
  userLogin: "",
});

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userLogin, setUserLogin] = useState(false);
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoriesLoading,
  } = useData("api/category");
  const {
    data: postData,
    error: postError,
    isLoading: postsLoading,
  } = useData("api/posts");
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (!postsLoading && !categoriesLoading) {
      setBlogPosts(postData);
      setCategories(categoryData);
    }
  }, [postData, postsLoading, categoriesLoading, categoryData]);
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

  function handleLogin() {
    setUserLogin(true);
  }

  function handleLogout() {
    setUserLogin(false);
  }

  function handlePostUpdate(e, changedPost) {
    //syncs selected post update to updating the allblogposts array
    const newPosts = blogPosts.map((post) =>
      post._id === e.target.id ? changedPost : post
    );
    setBlogPosts(newPosts);
  }

  function handleNewPost(newPost) {
    const newPosts = [...blogPosts, newPost];
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
  const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/edit/:id",
        element: <EditPage />,
      },
      {
        path: "/new",
        element: <NewPostPage />,
      },
    ]);
    return <RouterProvider router={router} />;
  };
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
        handleNewPost,
        syncImageDelete,
        postsLoading,
        categories,
        categoriesLoading,
        userLogin,
        handleLogin,
        handleLogout,
      }}
    >
      <Router />
    </appContext.Provider>
  );
}

export default App;
