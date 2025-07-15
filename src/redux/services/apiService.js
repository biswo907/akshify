import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../http/url";

export const employeeService = createApi({
  reducerPath: "employeeService",
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
  tagTypes: ["Employee"], // For cache invalidation
  endpoints: (builder) => ({
    // 🔹 Create a new employee
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "users/create-employee",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Employee"]
    }),

    // 🔹 Get all employees under a company
    employeeList: builder.query({
      query: () => ({
        url: "users/list-employees",
        method: "GET"
      }),
      providesTags: ["Employee"]
    }),

    // 🔹 Toggle active/inactive status of an employee
    toggleEmployeeStatus: builder.mutation({
      query: (data) => ({
        url: "users/toggle-status",
        method: "PATCH",
        body: data // expects { userId, is_active }
      }),
      invalidatesTags: ["Employee"]
    }),

    // 🔹 Get own profile (company or employee)
    getProfile: builder.query({
      query: () => ({
        url: "users/profile",
        method: "GET"
      })
    }),

    // 🔹 Update own profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "users/update-profile",
        method: "PATCH",
        body: data
      })
    }),

    // ✅ NEW: Update employee by ID
    updateEmployee: builder.mutation({
      query: (body) => ({
        url: `users/edit-employees`,
        method: "PUT",
        body // expects: { employeeId, full_name, email, ... }
      }),
      invalidatesTags: ["Employee"]
    })
  })
});

// ✅ Export hooks
export const {
  useCreateEmployeeMutation,
  useEmployeeListQuery,
  useToggleEmployeeStatusMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateEmployeeMutation
} = employeeService;
