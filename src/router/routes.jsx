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
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.BOOKMARK,
            element: <BookmarksPage />,
          },
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: ROUTES.SETTINGS,
            element: <SettingPages />,
          },
        ],
      },
      // Admin routes (require admin role)
      {
        element: <ProtectedRoute requireAdmin />,
        children: [
          {
            path: ROUTES.ADMIN_DASHBOARD,
            element: <AdminDashboard />,
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
