import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SearchScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard";
import Header from "./components/Header";
import FooterC from "./components/FooterC";
import toast, { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePostScreen from "./screens/CreatePostScreen";
import UpdatePost from "./screens/UpdatePost";
import PostPage from "./screens/PostPage";
import ScrollToTop from "./components/ScrollToTop";
// import dotenv from 'dotenv';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePostScreen />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="/post/:postSlug" element={<PostPage />} />
        </Routes>
        <FooterC />
      </BrowserRouter>
    </>
  );
}

export default App;
