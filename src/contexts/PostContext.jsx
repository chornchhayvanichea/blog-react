import React, { createContext, useContext, useState, useCallback } from "react";
import { postService } from "../services/postService";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  // Wrap with useCallback to memoize the function
  const fetchAllPosts = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const { posts, pagination } = await postService.getAllPosts(params);
      setPosts(posts);
      setPagination(pagination);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since it doesn't depend on any props/state

  const fetchCurrentUserPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { posts: fetchedPosts, pagination } =
        await postService.currentUserPosts({
          mine: 1,
        });

      // Ensure each post has user object with avatar & name
      const normalizedPosts = fetchedPosts.map((post) => ({
        ...post,
        user: {
          id: post.user?.id || null,
          name: post.user?.name || "Unknown User",
          avatar: post.user?.avatar || null,
        },
      }));

      setPosts(normalizedPosts);
      setPagination(pagination);
    } catch (error) {
      console.error("Failed to fetch user's posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (payload) => {
    setLoading(true);
    try {
      const post = await postService.createPost(payload);
      setPosts((prev) => [post, ...prev]);
      return post;
    } catch (error) {
      console.error("Failed to create post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);
  const updatePost = useCallback(async (post_id, payload) => {
    setLoading(true);
    try {
      const updatedPost = await postService.updatePost(post_id, payload);
      setPosts((prev) => prev.map((p) => (p.id === post_id ? updatedPost : p)));
      return updatedPost;
    } catch (error) {
      console.error("Failed to update post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchPostById = useCallback(async (postId) => {
    setLoading(true);
    try {
      const post = await postService.getPostById(postId);
      setCurrentPost(post);
      return post;
    } catch (error) {
      console.error("Failed to fetch post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);
  const deletePost = useCallback(async (post_id) => {
    setLoading(true);
    try {
      const message = await postService.deletePost({ post_id });
      setPosts((prev) => prev.filter((p) => p.id !== post_id));
      return message;
    } catch (error) {
      console.error("Failed to delete post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PostContext.Provider
      value={{
        currentPost,
        posts,
        pagination,
        loading,
        fetchAllPosts,
        fetchPostById,
        fetchCurrentUserPosts,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
export default PostProvider;
