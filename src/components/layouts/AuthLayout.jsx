import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      {/* Modern container with better shadow and no extra padding */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {children}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
