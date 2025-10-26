import API_ENDPOINTS from "../constants/apiEndPoints";
import api from "./api";

export const postService = {
  getAllPosts: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.POSTS.ALL, { params });
    return response.data;
  },
  getPostById: async (id) => {
    const response = await api.get(API_ENDPOINTS.POSTS.DETAIL(id));
    return response.data;
  },
  createPost: async (content) => {
    const response = await api.post(API_ENDPOINTS.POSTS.CREATE, content);
    return response.data;
  },
  updatePost: async (id, content) => {
    const response = await api.put(API_ENDPOINTS.POSTS.UPDATE(id), content);
    return response.data;
  },
  deletePost: async (id) => {
    const response = await api.delete(API_ENDPOINTS.POSTS.DELETE(id));
    return response.data;
  },
};
