import Index from "./pages/Index/Index";
import { useData } from "./helpers/Hooks";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import { createContext } from "react";
import Dashboard from "./pages/DashboardPage/Dashboard";
import ProtectedRoute from "./pages/PageComponents/ProtectedRoutes";
import ContentPage from "./pages/ContentPage/ContentPage";
import EditPage from "./pages/EditPost/EditPage";
import NewPostPage from "./pages/NewPost/NewPostPage";
import NewCategoryPage from "./pages/NewCategory/NewCategoryPage";
import CategoryPage from "./pages/CategoriesPage/CategoryPage";
export const appContext = createContext({
  blogPosts: [],
  accessToken: "",
  refreshToken: "",
  updateAccessToken: () => {},
  updateRefreshToken: () => {},
});

export const contentContext = createContext({
  blogPosts: [],
  handleDelete: () => {},
  handlePostUpdate: () => {},
  handleNewPost: () => {},
  syncImageDelete: () => {},
  categoriesLoading: "",
  postsLoading: "",
  handleNewCategory: () => {},
});
export const loginContext = createContext({
  handleLogin: () => {},
  handleLogout: () => {},
  user: {},
});

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userLogin, setUserLogin] = useState(false);
  const [user, setUser] = useState({});
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

  function handleLogin(user) {
    setUserLogin(true);
    setUser(user);
  }

  function handleLogout() {
    setUserLogin(false);
    setUser({});
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

  function handleNewCategory(newcategory) {
    const newCategories = [...categories, newcategory];
    setCategories(newCategories);
  }
  function syncImageDelete(e) {
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

  const ProtectedRouter = () => {
    const router = createBrowserRouter([
      {
        path: "/login",
        element: (
          <Index
            userLogin={userLogin}
            postsLoading={postsLoading}
            categoriesLoading={categoriesLoading}
          />
        ),
      },
      {
        path: "/",
        element: <ProtectedRoute userLogin={userLogin} />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "content",
            element: <ContentPage />,
          },
          {
            path: "edit/:id",
            element: <EditPage />,
          },
          {
            path: "new",
            element: <NewPostPage />,
          },
          {
            path: "categories",
            element: <CategoryPage />,
          },
          {
            path: "new-category",
            element: <NewCategoryPage />,
          },
        ],
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
      }}
    >
      <loginContext.Provider value={{ handleLogin, handleLogout, user }}>
        <contentContext.Provider
          value={{
            blogPosts,
            postsLoading,
            handleDelete,
            handlePostUpdate,
            handleNewPost,
            syncImageDelete,
            handleNewCategory,
            categories,
            categoriesLoading,
          }}
        >
          <ProtectedRouter />
        </contentContext.Provider>
      </loginContext.Provider>
    </appContext.Provider>
  );
}

export default App;
