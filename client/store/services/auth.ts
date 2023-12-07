import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponse } from "@/types/auth/login";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, any>({
      query: (data: any) => ({ url: "/login", method: "POST", body: data }),
    }),
    register: builder.mutation<LoginResponse, any>({
      query: (data: any) => ({ url: "/register", method: "POST", body: data }),
    }),
    getAuthData: builder.query<LoginResponse, { token: string }>({
      query: ({ token }) => ({
        url: "/auth-data",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetAuthDataQuery } =
  authApi;
