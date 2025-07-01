import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../http/url";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    }
  }),
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (taskData) => ({
        url: "/tasks/create-task",
        method: "POST",
        body: taskData
      })
    }),
    getTask: builder.query({
      query: () => "/tasks/get-all-task"
    }),
    updateTaskStatus: builder.mutation({
      query: (payload) => ({
        url: `tasks/update-task-status`,
        method: "PATCH",
        body:payload
      })
    }),
    updateTask: builder.mutation({
      query: (payload) => ({
        url: `tasks/update-task`,
        method: "PATCH",
        body:payload
      })
    })
  })
});
export const {
  useCreateTaskMutation,
  useGetTaskQuery,
  useUpdateTaskStatusMutation,
  useUpdateTaskMutation,
} = taskApi;

