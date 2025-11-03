

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.MODE === "production"
      ? "https://oneenbackend.vercel.app/api/"
      : "/api",
  credentials: "include",
});

export const certificatesApi = createApi({
  reducerPath: 'certificatesApi',
  baseQuery,
  tagTypes: ['certificates'],
 endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/user/login', // your login route
        method: 'POST',
        body: data,
      }),
    }),
  }),
});


export const { useLoginUserMutation } = certificatesApi;