import { hydrateFavorites, persistFavorites } from "./thunks";
import { loadFavorites, saveFavorites } from "src/storage";
import type { Post } from "@store/api/interfaces";

jest.mock("src/storage", () => ({
  loadFavorites: jest.fn(),
  saveFavorites: jest.fn(),
}));

const mockPost: Post = { id: 1, title: "Post de prueba" } as Post;
const mockData = { "admin@test.com": [mockPost] };

describe("favorites thunks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("carga correctamente los favoritos si no hay errores", async () => {
    (loadFavorites as jest.Mock).mockResolvedValueOnce(mockData);

    const dispatch = jest.fn();
    const thunk = hydrateFavorites();
    const result = await thunk(dispatch, () => ({}), undefined);

    expect(result.payload).toEqual(mockData);
    expect(result.type).toBe("favorites/hydrate/fulfilled");
  });

  it("devuelve un error si falla al cargar los favoritos", async () => {
    (loadFavorites as jest.Mock).mockRejectedValueOnce(new Error("ups"));

    const dispatch = jest.fn();
    const thunk = hydrateFavorites();
    const result = await thunk(dispatch, () => ({}), undefined);

    expect(result.payload).toBe("Error cargando favoritos");
    expect(result.type).toBe("favorites/hydrate/rejected");
  });

  it("guarda los favoritos correctamente sin errores", async () => {
    const dispatch = jest.fn();
    const thunk = persistFavorites(mockData);
    const result = await thunk(dispatch, () => ({}), undefined);

    expect(saveFavorites).toHaveBeenCalledWith(mockData);
    expect(result.type).toBe("favorites/persist/fulfilled");
  });

  it("devuelve un error si falla al guardar los favoritos", async () => {
    (saveFavorites as jest.Mock).mockRejectedValueOnce(new Error("fail"));

    const dispatch = jest.fn();
    const thunk = persistFavorites(mockData);
    const result = await thunk(dispatch, () => ({}), undefined);

    expect(result.payload).toBe("Error guardando favoritos");
    expect(result.type).toBe("favorites/persist/rejected");
  });
});