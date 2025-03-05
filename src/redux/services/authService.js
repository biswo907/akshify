import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../http/url";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: "auth/signin",
        method: "POST",
        body: credentials
      })
    }),
    register: builder.mutation({
      query: userData => ({
        url: "/auth/signup",
        method: "POST",
        body: userData
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation } = authApi;
