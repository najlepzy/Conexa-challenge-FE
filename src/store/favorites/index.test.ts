import reducer, { addFavorite, removeFavorite } from "./index";
import { hydrateFavorites, persistFavorites } from "./thunks";
import type { FavoritesState } from "./types";
import type { Post } from "@store/api/interfaces";

const mockPost: Post = { id: 1, title: "Post de prueba" } as Post;
const email = "usuario@test.com";

describe("favoritesSlice", () => {
  const initialState: FavoritesState = {
    itemsByUser: {},
    loaded: false,
    error: null,
  };

  it("devuelve el estado inicial correctamente", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state).toEqual(initialState);
  });

  it("agrega un post a favoritos para un usuario", () => {
    const newState = reducer(
      initialState,
      addFavorite({ email, post: mockPost })
    );
    expect(newState.itemsByUser[email]).toEqual([mockPost]);
  });

  it("no agrega el mismo post si ya existe en favoritos", () => {
    const stateWithPost = {
      ...initialState,
      itemsByUser: { [email]: [mockPost] },
    };
    const newState = reducer(
      stateWithPost,
      addFavorite({ email, post: mockPost })
    );
    expect(newState.itemsByUser[email]).toHaveLength(1);
  });

  it("elimina un post de favoritos según su ID", () => {
    const stateWithPost = {
      ...initialState,
      itemsByUser: { [email]: [mockPost] },
    };
    const newState = reducer(
      stateWithPost,
      removeFavorite({ email, postId: mockPost.id })
    );
    expect(newState.itemsByUser[email]).toEqual([]);
  });

  it("al iniciar la carga de favoritos cambia flags correctamente", () => {
    const action = { type: hydrateFavorites.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.loaded).toBe(false);
    expect(newState.error).toBeNull();
  });

  it("al cargar los favoritos correctamente, los guarda en el estado", () => {
    const payload = { [email]: [mockPost] };
    const action = { type: hydrateFavorites.fulfilled.type, payload };
    const newState = reducer(initialState, action);
    expect(newState.itemsByUser).toEqual(payload);
    expect(newState.loaded).toBe(true);
  });

  it("si falla la carga de favoritos, guarda el error en el estado", () => {
    const action = {
      type: hydrateFavorites.rejected.type,
      payload: "Error al cargar",
    };
    const newState = reducer(initialState, action);
    expect(newState.error).toBe("Error al cargar");
    expect(newState.loaded).toBe(true);
  });

  it("si falla el guardado de favoritos, actualiza el error", () => {
    const action = {
      type: persistFavorites.rejected.type,
      payload: "Error al guardar",
    };
    const newState = reducer(initialState, action);
    expect(newState.error).toBe("Error al guardar");
  });
});
