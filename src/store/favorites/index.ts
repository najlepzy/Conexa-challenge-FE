import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  FavoritesState,
  AddFavoritePayload,
  RemoveFavoritePayload,
} from "./types";
import { hydrateFavorites, persistFavorites } from "./thunks";

const initialState: FavoritesState = {
  itemsByUser: {},
  loaded: false,
  error: null,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<AddFavoritePayload>) {
      const { email, post } = action.payload;
      const list = state.itemsByUser[email] || [];
      if (!list.find((p) => p.id === post.id)) {
        state.itemsByUser[email] = [...list, post];
      }
    },
    removeFavorite(state, action: PayloadAction<RemoveFavoritePayload>) {
      const { email, postId } = action.payload;
      state.itemsByUser[email] = (state.itemsByUser[email] || []).filter(
        (p) => p.id !== postId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateFavorites.pending, (state) => {
        state.loaded = false;
        state.error = null;
      })
      .addCase(hydrateFavorites.fulfilled, (state, { payload }) => {
        state.itemsByUser = payload;
        state.loaded = true;
      })
      .addCase(hydrateFavorites.rejected, (state, { payload }) => {
        state.loaded = true;
        state.error = payload ?? "Error desconocido";
      });

    builder.addCase(persistFavorites.rejected, (state, { payload }) => {
      state.error = payload ?? "Error guardando favoritos";
    });
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;