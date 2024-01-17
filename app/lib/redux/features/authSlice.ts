// authSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: any; // Sesuaikan dengan bentuk data pengguna Anda
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post("http://localhost:8000/auth/login", {
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post("/api/auth/register", {
      email,
      password,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("webtoken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.backendTokens.accessToken;
      console.log(action.payload);
      state.isLoading = false;
      state.error = null;
      localStorage.setItem(
        "webtoken",
        action.payload.backendTokens.accessToken
      );
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Login failed.";
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.backendTokens.accessToken;
      state.isLoading = false;
      state.error = null;
      localStorage.setItem("webtoken", action.payload.token);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Registration failed.";
    });
  },
});

export const { logoutUser } = authSlice.actions;
export const selectAuth = (state: any) => state.auth;

export default authSlice.reducer;
