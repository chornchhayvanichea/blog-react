import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import { ROUTES } from "../constants/routes";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../components/layouts/AuthLayout";
import ForgetPasswordForm from "../components/auth/ForgetPasswordForm";
import MainPageLayout from "../components/layouts/MainPageLayout";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ReportListPage from "../pages/admin/ReportsListPage";
import SettingPages from "../pages/SettingsPage";
import ProtectedRoute from "../components/ProtectedRoute";
import BookmarksPage from "../pages/BookmarksPage";
import PostDetailPage from "../pages/posts/PostDetailPage";
import UserPostListPage from "../pages/posts/UserPostsList";
import ManageUsersPage from "../pages/admin/ManageUsersPage";
import CreatePostPage from "../pages/posts/CreatePostPage";

const routes = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: ROUTES.FORGET_PASSWORD,
        element: <ForgetPasswordForm />,
      },
    ],
  },
  {
    element: <MainPageLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      // Protected routes (require login only)
      {
        children: [
          {
            path: ROUTES.BOOKMARK,
            element: <BookmarksPage />,
          },
          {
            path: ROUTES.CREATE_POST,
            element: <CreatePostPage />,
          },
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: ROUTES.CURRENT_USER_POSTS,
            element: <UserPostListPage />,
          },
          {
            path: ROUTES.SETTINGS,
            element: <SettingPages />,
          },
          {
            path: "/PostDetailPage",
            element: <PostDetailPage />,
          },
        ],
      },
      // Admin routes (require admin role)
      {
        children: [
          {
            path: ROUTES.ADMIN_DASHBORD,
            element: <AdminDashboard />,
          },
          {
            path: ROUTES.ADMIN_USERS,
            element: <ManageUsersPage />,
          },
          {
            path: ROUTES.ADMIN_REPORTS,
            element: <ReportListPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routes;
