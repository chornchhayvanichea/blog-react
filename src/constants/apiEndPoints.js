const BASE_URL = "http://localhost:8000/api";

const API_ENDPOINTS = {
  BASE: BASE_URL,
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,

    LOGOUT: `${BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
    CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
  },
  USER: {
    CURRENT: `${BASE_URL}/auth/me`, // fixed to match backend
    SHOW: `${BASE_URL}/user/`, // get user by id or self
    MY_POSTS: `${BASE_URL}/user/mypost`,
    UPDATE: (id) => `${BASE_URL}/user/${id}`,
  },
  POSTS: {
    ALL: `${BASE_URL}/posts`,
    DETAIL: (id) => `${BASE_URL}/posts/${id}`,
    CREATE: `${BASE_URL}/posts`,
    UPDATE: (id) => `${BASE_URL}/posts/${id}`,
    DELETE: (id) => `${BASE_URL}/posts/${id}`,
  },
  COMMENTS: {
    LIST: (postId) => `${BASE_URL}/posts/${postId}/comments`,
    CREATE: (postId) => `${BASE_URL}/posts/${postId}/comments`,
    UPDATE: (postId, commentId) =>
      `${BASE_URL}/posts/${postId}/comments/${commentId}`,
    DELETE: (postId, commentId) =>
      `${BASE_URL}/posts/${postId}/comments/${commentId}`,
  },
  ACTIONS: {
    TOGGLE_LIKE: (type, typeId) => `${BASE_URL}/actions/like/${type}/${typeId}`,
    CREATE_REPORT: (type, typeId) =>
      `${BASE_URL}/actions/report/${type}/${typeId}`,
    BOOKMARKS: {
      TOGGLE_BOOKMARK: (postId) =>
        `${BASE_URL}/actions/bookmarks/${postId}/toggle`,
      LIST: `${BASE_URL}/actions/bookmarks/`,
    },
    POST_VIEW_INCREMENT: (postId) => `${BASE_URL}/actions/view/${postId}`,
  },
  CATEGORIES: {
    ALL: `${BASE_URL}/categories`,
  },
  ADMIN: {
    TOGGLE_BAN: (userId) => `${BASE_URL}/admin/users/${userId}/ban`,
    RESTORE_POST: (postId) => `${BASE_URL}/admin/posts/${postId}/restore`,
    REPORTS_LIST: `${BASE_URL}/admin/reports`,
    USERS_LIST: `${BASE_URL}/admin/users`,
  },
};

export default API_ENDPOINTS;
