import { apiSlice } from "../../app/api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include",
      }),
    }),
    updateCover: builder.mutation({
      query: (cover) => ({
        url: "update-user-cover",
        method: "PUT",
        body: { cover },
        credentials: "include",
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "update-user-info",
        method: "PUT",
        body: { name, email, password },
        credentials: "include",
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "get-all-users",
        method: "GET",
        credentials: "include",
      }),
    }),
    charge: builder.mutation({
      query: ({ userId, unit }) => ({
        url: "add-unit",
        method: "PUT",
        body: { userId, unit },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useChargeMutation,
  useGetAllUsersQuery,
  useUpdateCoverMutation,
} = userApi;
