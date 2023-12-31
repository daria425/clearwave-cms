import Index from "./pages/Index/Index";
import { useData, useAuth } from "./helpers/Hooks";
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
import SummaryView from "./pages/EditPost/components/SummaryView";
import PostDetailsCard from "./pages/EditPost/components/PostDetailsCard";
import TextEditor from "./pages/EditPost/components/TextEditor";
import CategoryDetailPage from "./pages/CategoryDetailsPage/CategoryDetailPage";
import DashboardGrid from "./pages/DashboardPage/components/DashboardGrid";
import ChatPage from "./pages/ChatPage/ChatPage";
import "./assets/styles/main.scss";
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
  const { user, setUser, userLogin, setUserLogin } = useAuth();
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
            children: [{ path: "", element: <DashboardGrid /> }, { path: "" }],
          },
          {
            path: "content",
            element: <ContentPage />,
          },
          {
            path: ":id",
            element: <EditPage />,
            children: [
              { path: "edit", element: <SummaryView /> },
              { path: "details", element: <PostDetailsCard /> },
              { path: "texteditor", element: <TextEditor /> },
            ],
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
          {
            path: "category/:id",
            element: <CategoryDetailPage />,
          },
          { path: "chat/:feature", element: <ChatPage /> },
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
