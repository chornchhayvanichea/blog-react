import API_ENDPOINTS from "../constants/apiEndPoints";
import api from "./api";

export const commentService = {
  // Fetch all comments for a post
  getComments: async (postId) => {
    const response = await api.get(API_ENDPOINTS.COMMENTS.LIST(postId));
    const comments = response.data?.data?.comments ?? [];

    const mappedComments = comments.map((c) => ({
      id: c.id,
      content: c.content ?? "",
      created_at: c.created_at,
      updated_at: c.updated_at,
      likes: c.likes ?? 0,
      is_liked: c.is_liked ?? false,
      user: {
        id: c.user?.id ?? null,
        name: c.user?.name ?? "Unknown",
        email: c.user?.email ?? null,
        role: c.user?.role ?? null,
        avatar: c.user?.profile?.avatar ?? null,
        bio: c.user?.profile?.bio ?? "",
      },
    }));

    return {
      success: response.data?.success ?? true,
      message: response.data?.message ?? "Comments retrieved successfully",
      comments: mappedComments,
    };
  },

  // Create a new comment
  createComment: async (postId, content) => {
    const response = await api.post(API_ENDPOINTS.COMMENTS.CREATE(postId), {
      content,
    });

    const comment = response.data?.data?.comment;
    if (!comment) return { success: false, message: "No comment returned" };

    return {
      success: response.data?.success ?? true,
      message: response.data?.message ?? "Comment created successfully",
      comment: {
        id: comment.id,
        content: comment.content ?? "",
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        likes: comment.likes ?? 0,
        is_liked: comment.is_liked ?? false,
        user: {
          id: comment.user?.id ?? null,
          name: comment.user?.name ?? "Unknown",
          email: comment.user?.email ?? null,
          role: comment.user?.role ?? null,
          avatar: comment.user?.profile?.avatar ?? null,
          bio: comment.user?.profile?.bio ?? "",
        },
      },
    };
  },

  // Update an existing comment
  updateComment: async (postId, content, commentId) => {
    const response = await api.patch(
      API_ENDPOINTS.COMMENTS.UPDATE(postId, commentId),
      { content },
    );

    const comment = response.data?.data?.comment;
    if (!comment) return { success: false, message: "No comment returned" };

    return {
      success: response.data?.success ?? true,
      message: response.data?.message ?? "Comment updated successfully",
      comment: {
        id: comment.id,
        content: comment.content ?? "",
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        likes: comment.likes ?? 0,
        is_liked: comment.is_liked ?? false,
        user: {
          id: comment.user?.id ?? null,
          name: comment.user?.name ?? "Unknown",
          email: comment.user?.email ?? null,
          role: comment.user?.role ?? null,
          avatar: comment.user?.profile?.avatar ?? null,
          bio: comment.user?.profile?.bio ?? "",
        },
      },
    };
  },

  // Delete a comment
  deleteComment: async (postId, commentId) => {
    const response = await api.delete(
      API_ENDPOINTS.COMMENTS.DELETE(postId, commentId),
    );

    return {
      success: response.data?.success ?? true,
      message: response.data?.message ?? "Comment deleted successfully",
    };
  },
};
