// src/services/authService.js
import api from "./api";
import API_ENDPOINTS from "../constants/apiEndPoints";

export const authService = {
  login: async (email, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });

    console.log("Login response:", response.data);

    const { data } = response.data;
    const { user, access_token, token_type, expires_in } = data; // Don't extract profile here

    console.log("Formatted user object:", {
      name: user.name,
      email: user.email,
      id: user.id,
      profile: user.profile, // Get profile from user object
    });

    return {
      message: response.data.message,
      token: access_token,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
        role: user.role,
        profile: {
          avatar: user.profile?.avatar, // Changed from profile?.avatar to user.profile?.avatar
          bio: user.profile?.bio, // Changed from profile?.bio to user.profile?.bio
        },
      },
      tokenType: token_type,
      expiresIn: expires_in,
    };
  },
  signup: async ({ email, name, password, password_confirmation }) => {
    const payload = { email, name, password, password_confirmation };
    const response = await api.post(API_ENDPOINTS.AUTH.SIGNUP, payload);
    const { data } = response.data;
    const { user, access_token, token_type, expires_in } = data;

    return {
      message: response.data.message,
      token: access_token,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
        is_banned: user.is_banned,
        role: user.role, // ← Add this too
        profile: {
          avatar: user.profile?.avatar || null, // ← Fixed
          bio: user.profile?.bio || null, // ← Fixed
        },
      },
      tokenType: token_type,
      expiresIn: expires_in,
    };
  },

  currentUserProfile: async () => {
    const response = await api.get(API_ENDPOINTS.USER.SHOW);
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
