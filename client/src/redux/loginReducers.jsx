import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  error: false,
  blocked: false,
  
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      (state.isLoggedIn = true), (state.error = false);
    },
    loginFailure: (state) => {
      (state.isLoggedIn = false), (state.error = true);
    },
    userBlocked: (state) => {
      state.blocked = true;
    },
  
  },
});

export const { loginFailure, loginSuccess, userBlocked, } = loginSlice.actions;
export default loginSlice.reducer;
