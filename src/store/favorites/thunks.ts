import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "@store/api/interfaces";
import { loadFavorites, saveFavorites } from "src/storage";

export const hydrateFavorites = createAsyncThunk<
  Record<string, Post[]>,
  void,
  { rejectValue: string }
>("favorites/hydrate", async (_, { rejectWithValue }) => {
  try {
    const data = await loadFavorites();
    return data;
  } catch (err: any) {
    return rejectWithValue("Error cargando favoritos");
  }
});

export const persistFavorites = createAsyncThunk<
  void,
  Record<string, Post[]>,
  { rejectValue: string }
>("favorites/persist", async (itemsByUser, { rejectWithValue }) => {
  try {
    await saveFavorites(itemsByUser);
  } catch (err: any) {
    return rejectWithValue("Error guardando favoritos");
  }
});