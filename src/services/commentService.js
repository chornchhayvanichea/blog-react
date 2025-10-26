import API_ENDPOINTS from "../constants/apiEndPoints";
import api from "./api";

export const commentService = {
  getComments: async (postId) => {
    const response = await api.get(API_ENDPOINTS.COMMENTS.LIST(postId));
    return response.data;
  },

  createComment: async (postId, content) => {
    const response = await api.post(
      API_ENDPOINTS.COMMENTS.CREATE(postId),
      content,
    );
    return response.data;
  },
  updateComment: async (postId, content, commentId) => {
    const response = await api.put(
      API_ENDPOINTS.COMMENTS.UPDATE(postId, commentId),
      { content },
    );
    return response.data;
  },
  deleteComment: async (postId, commentId) => {
    const response = await api.delete(
      API_ENDPOINTS.COMMENTS.DELETE(postId, commentId),
    );
    return response.data;
  },
};
