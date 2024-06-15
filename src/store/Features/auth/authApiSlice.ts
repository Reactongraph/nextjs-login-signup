import apiSlice from "@/store/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    createUser: builder.mutation({
      query: (payload: {
        fullName: string;
        email: string;
        password: string;
      }) => ({
        url: `/user`,
        method: "POST",
        body: payload,
      }),
    }),
    loginUser: builder.mutation({
      query: (payload: { email: string; password: string }) => ({
        url: `/user/login`,
        method: "POST",
        body: payload,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (payload: { email: string }) => ({
        url: `/user/forget-password`,
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload: { password: string; token: string }) => ({
        url: `/user/reset-password`,
        method: "POST",
        body: payload,
      }),
    }),
    updateProfile: builder.mutation({
      query: (payload: any) => ({
        url: `/user`,
        method: "PUT",
        body: payload,
      }),
    }),
    updateEmail: builder.mutation({
      query: (payload: { email: string }) => ({
        url: `/user/email`,
        method: "PUT",
        body: payload,
      }),
    }),
    updatePassword: builder.mutation({
      query: (payload: { password: string; newPassword: string }) => ({
        url: `/user/password`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation
} = authApiSlice;
