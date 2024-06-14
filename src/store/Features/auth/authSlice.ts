import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  email: "",
  id: "",
  fullName: "",
  avatar: "",
  phone: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logOut: () => {
      return { ...initialState };
    },

    logIn: (state, action) => {
      state.loggedIn = true;
      state.email = action.payload?.email || "";
      state.id = action.payload?.id || "";
      state.fullName = action.payload?.fullName || "";
      state.avatar = action.payload?.avatar || "";
      state.phone = action.payload?.phone || "";
    },
    updateData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { logIn, logOut, updateData } = authSlice.actions;

export default authSlice.reducer;
