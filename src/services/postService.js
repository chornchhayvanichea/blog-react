import API_ENDPOINTS from "../constants/apiEndPoints";
import api from "./api";

export const postService = {
  getAllPosts: async () => {
    const response = await api.get(API_ENDPOINTS.POSTS.ALL);
    const { data = {} } = response.data || {};
    const { posts = [], pagination = {} } = data;

    const mappedPosts = posts.map((post) => ({
      id: post.id,
      // map nested user
      user: {
        id: post.user?.id,
        name: post.user?.name,
        avatar: post.user?.avatar,
      },
      // map nested category
      category: {
        id: post.category?.id,
        name: post.category?.category, // your backend calls it 'category'
      },
      title: post.title,
      slug: post.slug,
      content: post.content,
      image: post.image,
      status: post.status,
      likes: post.likes,
      comments: post.comments,
      views: post.views,
      is_liked: post.is_liked,
      is_bookmarked: post.is_bookmarked,
      bookmarks: post.bookmarks,
      created_at: post.created_at,
      updated_at: post.updated_at,
    }));

    return {
      message: response.data.message,
      posts: mappedPosts,
      pagination: {
        current_page: pagination.current_page ?? 1,
        last_page: pagination.last_page ?? 1,
        per_page: pagination.per_page ?? 10,
        total: pagination.total ?? mappedPosts.length,
      },
    };
  },

  getPostById: async (id) => {
    const response = await api.get(API_ENDPOINTS.POSTS.DETAIL(id));
    const { post } = response.data?.data || {};

    if (!post) return null;

    return {
      message: response.data.message,
      post_id: post.id,
      user_id: post.user?.id || null,
      user_name: post.user?.name || "Unknown",
      user_avatar: post.user?.avatar || null,
      category_id: post.category?.id || null,
      category_name: post.category?.category || null,
      title: post.title,
      content: post.content,
      image: post.image || null,
      status: post.status,
      views: post.views || 0,
      likes: post.likes || 0,
      comments: post.comments || 0,
      bookmarks: post.bookmarks || 0,
      is_liked: post.is_liked || false,
      is_bookmarked: post.is_bookmarked || false,
      created_at: post.created_at,
      updated_at: post.updated_at,
    };
  },

  createPost: async (formData) => {
    let payload;

    if (formData instanceof FormData) {
      payload = formData;
    } else {
      payload = {
        title: formData.title,
        content: formData.content,
        category_id: formData.category_id,
        status: formData.status || "draft",
        image: formData.image || null,
      };
    }

    const response = await api.post(API_ENDPOINTS.POSTS.CREATE, payload, {
      headers:
        formData instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : {},
    });

    const { data } = response.data;
    const post = data?.post ?? {};

    return {
      message: response.data.message,
      id: post.id,
      user_id: post.user_id,
      views: post.views,
      created_at: post.created_at,
      updated_at: post.updated_at,
      title: post.title,
      content: post.content,
      category_id: post.category_id,
      status: post.status,
      image: post.image,
    };
  },

  updatePost: async (post_id, formData) => {
    let payload;

    if (formData instanceof FormData) {
      payload = formData;
    } else {
      payload = formData;
    }

    const response = await api.post(
      API_ENDPOINTS.POSTS.UPDATE(post_id),
      payload,
      {
        headers:
          formData instanceof FormData
            ? {
                "Content-Type": "multipart/form-data",
              }
            : {},
      },
    );

    const { data } = response.data;
    const post = data?.post || {};

    return {
      message: response.data.message,
      id: post.id,
      user_id: post.user_id,
      category_id: post.category_id,
      title: post.title,
      content: post.content,
      image: post.image,
      status: post.status,
      views: post.views,
      created_at: post.created_at,
      updated_at: post.updated_at,
    };
  },

  deletePost: async ({ post_id }) => {
    const response = await api.delete(API_ENDPOINTS.POSTS.DELETE(post_id));
    return response.data.message;
  },

  currentUserPosts: async ({ mine = 1 } = {}) => {
    const response = await api.get(API_ENDPOINTS.POSTS.ALL, {
      params: { mine },
    });
    const { data = {}, message = "" } = response.data || {};
    const { posts = [], pagination = {} } = data;

    const mappedPosts = posts.map((post) => ({
      id: post.id,
      // FIXED: Map user object properly for PostCard
      user: {
        id: post.user?.id || null,
        name: post.user?.name || "Unknown User",
        avatar: post.user?.avatar || null,
      },
      // FIXED: Map category object properly
      category: {
        id: post.category?.id || null,
        name: post.category?.category || post.category?.name || null,
      },
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || post.content?.substring(0, 150) + "...",
      image: post?.image,
      views: post.views || 0,
      likes: post.likes || 0,
      comments: post.comments || 0,
      bookmarks: post.bookmarks || 0,
      status: post.status,
      is_liked: post.is_liked || false,
      is_bookmarked: post.is_bookmarked || false,
      created_at: post.created_at,
      updated_at: post.updated_at,
    }));

    return {
      message,
      posts: mappedPosts,
      pagination: {
        current_page: pagination.current_page ?? 1,
        last_page: pagination.last_page ?? 1,
        per_page: pagination.per_page ?? 10,
        total: pagination.total ?? mappedPosts.length,
      },
    };
  },
};
