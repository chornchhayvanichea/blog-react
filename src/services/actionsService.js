import API_ENDPOINTS from "../constants/apiEndPoints";
import api from "./api";

export const actionService = {
  toggleLike: async (type, typeId) => {
    const response = await api.post(
      API_ENDPOINTS.ACTIONS.TOGGLE_LIKE(type, typeId),
    );
    return response.data;
  },
  createReport: async (type, typeId) => {
    const response = await api.post(
      API_ENDPOINTS.ACTIONS.CREATE_REPORT(type, typeId),
    );
    return response.data;
  },
  toggleBookmark: async (postId) => {
    const response = await api.post(
      API_ENDPOINTS.ACTIONS.BOOKMARKS.TOGGLE_BOOKMARK(postId),
    );
    return response.data;
  },
  getBookmarksList: async () => {
    const response = await api.get(API_ENDPOINTS.ACTIONS.BOOKMARKS);
    return response.data;
  },
  toggleBan: async (userId) => {
    const response = await api.post(API_ENDPOINTS.ADMIN.TOGGLE_BAN(userId));
    return response.data;
  },
  retorePost: async (postId) => {
    const response = await api.post(API_ENDPOINTS.ADMIN.RESTORE_POST(postId));
    return response.data;
  },
  reportsList: async () => {
    const response = await api.get(API_ENDPOINTS.ADMIN.REPORTS_LIST);
    return response.data;
  },
};
