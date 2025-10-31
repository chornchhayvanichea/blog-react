import API_ENDPOINTS from "../constants/apiEndPoints";
import api from "./api";

export const postService = {
  getAllPosts: async () => {
    const response = await api.get(API_ENDPOINTS.POSTS.ALL);
    const { data = {} } = response.data || {};
    const { posts = [], pagination = {} } = data;
    const mappedPosts = posts.map((post) => ({
      id: post.id,
      user_id: post.user_id,
      category_id: post.category_id,
      title: post.title,
      content: post.content,
      image: post?.image,
      views: post.views,
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
    const { data } = response.data?.data || {};
    const {
      id: post_id,
      user_id,
      category_id,
      title,
      content,
      image = null,
      status,
      views,
      created_at,
      updated_at,
    } = data.post ?? {};
    return {
      message: response.data.message,
      post_id: post_id,
      user_id: user_id,
      category_id: category_id,
      title: title,
      content: content,
      image: image,
      status: status,
      views: views,
      created_at,
      updated_at,
    };
  },
  createPost: async ({
    title,
    content,
    category_id,
    status = "draft",
    image = null,
  }) => {
    const payloads = { title, content, category_id, status, image };
    const response = await api.post(API_ENDPOINTS.POSTS.CREATE, payloads);

    const { data } = response.data;
    const post = data?.post ?? {};

    return {
      message: response.data.message,
      post_id: post.id,
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
  updatePost: async ({ post_id, content }) => {
    const response = await api.put(
      API_ENDPOINTS.POSTS.UPDATE(post_id),
      content,
    );
    const { data } = response.data;
    const { post } = data?.data ?? {};

    return {
      message: response.data.message,
      post_id: post.post_id,
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

  currentUserPosts: async ({ mine = 0 } = {}) => {
    const response = await api.get(API_ENDPOINTS.POSTS.ALL, {
      params: { mine },
    });
    const { data = {}, message = "" } = response.data || {};
    const { posts = [], pagination = {} } = data;
    const mappedPosts = posts.map((post) => ({
      id: post.id,
      user_id: post.user_id,
      category_id: post.category_id,
      title: post.title,
      content: post.content,
      image: post?.image,
      views: post.views,
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
