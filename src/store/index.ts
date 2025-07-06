import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import favoritesReducer from "./favorites";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    favorites: favoritesReducer,
    auth: authReducer,
  },
  middleware: (g) => g().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;