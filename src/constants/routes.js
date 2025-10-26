const BASE = "/";
const AUTH = "/auth";
const USER = "/user";
const POST = "/post";
const BOOKMARK = "/bookmark";
const ADMIN = "/admin";
const SETTING = "/setting";
export const ROUTES = {
  HOME: BASE,
  POST_DETAIL: (id) => `${POST}/${id}`,
  CATEGORY: (categoryName) => `/category/${categoryName}`,

  LOGIN: `${AUTH}/login`,
  SIGNUP: `${AUTH}/signup`,
  RESET_PASSWORD: `${AUTH}/reset-password`,
  FORGET_PASSWORD: `${AUTH}/forget-password`,

  CREATE_POST: `${POST}/new`,
  EDIT_POST: (id) => `${POST}/${id}/edit`,
  BOOKMARK: BOOKMARK,

  PROFILE: `${USER}/me`,
  CURRENT_USER_POSTS: `${POST}/my-posts`,

  SETTINGS: SETTING,

  ADMIN_DASHBORD: ADMIN,
  ADMIN_USERS: `${ADMIN}/users`,
  ADMIN_REPORTS: `${ADMIN}/reports`,
  ADMIN_POSTS: `${ADMIN}/posts`,
};
