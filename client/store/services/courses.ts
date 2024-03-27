import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateCourseRequest,
  CreateCourseResponse,
} from "@/types/courses/course";

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/courses",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation<CreateCourseResponse, any>({
      query: (data: CreateCourseRequest) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateCourseMutation } = coursesApi;
