import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../http/url';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
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
    createEmployee: builder.mutation({
      query: (data) => ({
        url: 'users/create-employee',
        method: 'POST',
        body: data,
      }),
    }),

    employeeList: builder.query({
      query: () => ({
        url: 'users/list-employees',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useEmployeeListQuery,
} = employeeApi;
