import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { ConfigProvider } from "antd";
import { theme } from "antd";
import { AuthProvider } from "./contexts/AuthContext";
import PostProvider from "./contexts/PostContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: darkMode ? "#4096ff" : "#1890ff",
          colorBgBase: darkMode ? "#141414" : "#ffffff",
          colorBgContainer: darkMode ? "#1f1f1f" : "#ffffff",
          colorBgElevated: darkMode ? "#262626" : "#ffffff",
          colorBgLayout: darkMode ? "#0a0a0a" : "#ffffff",
          colorBorder: darkMode ? "#434343" : "#d9d9d9",
          colorBorderSecondary: darkMode ? "#303030" : "#f0f0f0",
          colorText: darkMode
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(0, 0, 0, 0.88)",
          colorTextSecondary: darkMode
            ? "rgba(255, 255, 255, 0.65)"
            : "rgba(0, 0, 0, 0.65)",
          colorTextTertiary: darkMode
            ? "rgba(255, 255, 255, 0.45)"
            : "rgba(0, 0, 0, 0.45)",
          borderRadius: 6,
          boxShadow: darkMode
            ? "0 1px 2px 0 rgba(0, 0, 0, 0.5), 0 1px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px 0 rgba(0, 0, 0, 0.3)"
            : "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
        },
      }}
    >
      <PostProvider>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </PostProvider>
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
