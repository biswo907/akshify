import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../http/url';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token; 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (taskData) => ({
        url: 'task/create',
        method: 'POST',
        body: taskData,
      }),
    }),
    getTaskDetails: builder.query({
      query: () => 'tasks/details',
    }),
    updateTask: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `tasks/update`,
        method: 'PUT',
        body: { id, ...updatedData },
      }),
    }),
    deleteTask: builder.mutation({
      query: (data) => ({
        url: `task/delete`,
        method: 'DELETE',
        body:  data ,
      }),
    }),
    getActiveTasks: builder.query({
      query: (userId) => `task/active?userId=${userId}`,
    }),    
    getTaskHistory: builder.query({
      query: () => 'task/history',
    }),
    getDeletedTasks: builder.query({
      query: () => 'task/deleted-tasks',
    }),
    changeStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `task/change-status`,
        method: 'PUT',
        body: { id, status },
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTaskDetailsQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetActiveTasksQuery,
  useGetTaskHistoryQuery,
  useGetDeletedTasksQuery,
  useChangeStatusMutation,
} = taskApi;
