// src/services/userService.js
import api from "./api";
import API_ENDPOINTS from "../constants/apiEndPoints";

export const userService = {
  updateProfile: async (id, formData) => {
    // formData should be a FormData object containing:
    // name, email, bio, avatar (file), password fields if changing password
    const response = await api.post(API_ENDPOINTS.USER.UPDATE(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  // In your authService.js or userService.js
  changePassword: async (
    currentPassword,
    newPassword,
    newPasswordConfirmation,
  ) => {
    const response = await api.post("/auth/change-password", {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
    });
    return response.data;
  },
};
