import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState } from "./interfaces";

const initialState: AuthState = {
  isLoggedIn: false,
  email: null,
  loaded: false,
};

export const hydrateAuth = createAsyncThunk("auth/hydrate", async () => {
  const json = await AsyncStorage.getItem("authState");
  return json ? JSON.parse(json) : initialState;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.email = action.payload;
      AsyncStorage.setItem("authState", JSON.stringify(state));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = null;
      AsyncStorage.setItem("authState", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateAuth.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.email = action.payload.email;
      state.loaded = true;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;