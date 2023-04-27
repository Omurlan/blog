import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// main API file
const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['likes', 'comments', 'replies'],
  endpoints: () => ({}),
});

export default apiSlice;
