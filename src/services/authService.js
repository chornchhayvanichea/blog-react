// src/services/authService.js
import api from "./api";
import API_ENDPOINTS from "../constants/apiEndPoints";

export const authService = {
  login: async (email, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    const { data } = response.data;
    const { user, access_token, token_type, expires_in } = data;
    return {
      message: response.data.message,
      token: access_token,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
      tokenType: token_type,
      expiresIn: expires_in,
    };
  },

  signup: async (userData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
    const { data } = response.data;
    const { user } = response.data.data;
    return {
      message: response.data.message,
      token: data.access_token,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
      tokenType: data.token_type,
      expiresIn: data.expires_in,
    };
  },

  currentUserProfile: async () => {
    const response = await api.get(API_ENDPOINTS.USER.CURRENT);
    const { user } = response.data.data; // ts equals to response.data.data.user
    return {
      message: response.data.message,
      name: user.name,
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      role: user.role,
      profile: {
        bio: user.profile?.bio,
        avatar: user.profile?.avatar,
      },
    };
  },

  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return {
      message: response.data.message,
      success: response.data.success,
    };
  },

  forgotPassword: async (email) => {
    const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email,
    });
    return response.data;
  },

  resetPassword: async (token, password, passwordConfirmation) => {
    const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      password,
      password_confirmation: passwordConfirmation,
    });
    return response.data;
  },

  changePassword: async (
    currentPassword,
    newPassword,
    newPasswordConfirmation,
  ) => {
    const response = await api.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
    });
    return response.data;
  },
};
