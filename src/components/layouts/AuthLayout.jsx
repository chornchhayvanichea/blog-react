import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-cyan-200 via-blue-300 to-purple-400 p-4">
      {/* Centered container box */}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {children}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
