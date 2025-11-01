import API_ENDPOINTS from "../constants/apiEndPoints";
import api from "./api";
export const actionService = {
  toggleLike: async (type, typeId) => {
    const response = await api.post(
      API_ENDPOINTS.ACTIONS.TOGGLE_LIKE(type, typeId),
    );
    // Return both liked state AND the count
    return {
      liked: response.data.data.liked,
      likes_count: response.data.data.likes_count,
    };
  },
  createReport: async (type, typeId, reason) => {
    const response = await api.post(
      API_ENDPOINTS.ACTIONS.CREATE_REPORT(type, typeId),
      { reason: reason }, // Add this
    );
    return response.data;
  },
  toggleBookmark: async (postId) => {
    const response = await api.post(
      API_ENDPOINTS.ACTIONS.BOOKMARKS.TOGGLE_BOOKMARK(postId),
    );
    return {
      is_bookmarked: response.data.data.bookmarked,
    };
  },
  getBookmarksList: async () => {
    const response = await api.get(API_ENDPOINTS.ACTIONS.BOOKMARKS);
    return response.data;
  },
  postViews: async (postId) => {
    const response = await api.post(
      API_ENDPOINTS.ACTIONS.POST_VIEW_INCREMENT(postId),
    );
    return response.data.data.view;
  },
  getCategories: async () => {
    const response = await api.get(API_ENDPOINTS.CATEGORIES.ALL);
    const { data = {} } = response.data || {};
    const categories = data.categories || [];
    const mappedCategories = categories.map((cat) => ({
      category_id: cat.id,
      category_name: cat.name,
      slug: cat.slug,
      posts_count: cat.posts_count,
    }));
    return {
      message: response.data.message,
      categories: mappedCategories,
    };
  },

  toggleBan: async (userId) => {
    const response = await api.patch(API_ENDPOINTS.ADMIN.TOGGLE_BAN(userId));
    const { data } = response.data; // unwrap the first "data"
    const { user } = data; // unwrap nested "user"

    return {
      message: response.data.message,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_banned: user.is_banned,
        profile: {
          avatar: user.avatar || null,
          bio: user.bio || null,
        },
        posts: user.posts || null,
        comments: user.comments || null,
        receivedLikesCount: user.receivedLikes_count || 0,
        totalViews: user.totalViews || 0,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
    };
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
