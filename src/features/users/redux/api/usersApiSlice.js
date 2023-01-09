import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ search }) => `/users?search=${search}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addUser: builder.mutation({
      query: (inputs) => ({
        url: "/users",
        method: "post",
        body: inputs,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (inputs) => ({
        url: "/users",
        method: "PATCH",
        body: inputs,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteManyUsers: builder.mutation({
      query: ({ ids }) => ({
        url: "/users/destroy",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteManyUsersMutation,
} = usersApiSlice;

//export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

/*const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);*/

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => {
  return !Object.values(state.api.queries)[0]
    ? initialState
    : Object.values(state.api.queries)[0].status !== "fulfilled"
    ? initialState
    : Object.values(state.api.queries)[0].data;
  //return selectUsersData(state) ?? initialState;
});
