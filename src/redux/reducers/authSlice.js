import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: null,
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logOutUser: state => {
      state.isLogin = false;
      state.user = null;
      state.token = null;
    }
  }
});

export const { setIsLogin, setUser, logOutUser, setToken } = authSlice.actions;
export default authSlice.reducer;
