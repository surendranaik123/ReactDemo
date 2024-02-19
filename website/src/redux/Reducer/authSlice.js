// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

console.log(initialState);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('Login Action Payload:', action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
