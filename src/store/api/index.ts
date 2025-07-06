import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@env";
import { Post, User } from "./interfaces";
import { TagType } from "./constants";
import { apiSlash } from "@utils/apiSlash/index";

const BASE_URL = apiSlash(API_BASE_URL);

export const api = createApi({
  reducerPath: "jsonApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: [TagType.Posts, TagType.Users],
  endpoints: (build) => ({
    getPosts: build.query<Post[], { page: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) =>
        `posts?_page=${page}&_limit=${limit}`,
      providesTags: (res, err, { page }) =>
        res
          ? [
              ...res.map(({ id }) => ({ type: TagType.Posts, id })),
              { type: TagType.Posts, id: `PAGE_${page}` },
            ]
          : [{ type: TagType.Posts, id: `PAGE_${page}` }],
    }),
    getPostById: build.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (res, err, id) => [{ type: TagType.Posts, id }],
    }),
    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: (res) =>
        res
          ? [
              ...res.map(({ id }) => ({ type: TagType.Users, id })),
              { type: TagType.Users, id: "LIST" },
            ]
          : [{ type: TagType.Users, id: "LIST" }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useGetUsersQuery } = api;

export { User };