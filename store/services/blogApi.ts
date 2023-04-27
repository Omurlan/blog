import { IBlog, IBlogReq } from '@interface/blog';
import apiSlice from './api';

const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<IBlog, IBlogReq>({
      query: (blog) => ({
        url: '/blogs',
        method: 'POST',
        body: blog,
      }),
    }),
  }),
});

export const { useCreatePostMutation } = blogApi;
