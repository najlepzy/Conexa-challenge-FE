import AsyncStorage from "@react-native-async-storage/async-storage";
import pako from "pako";
import { toByteArray } from "base64-js";
import { loadFavorites, saveFavorites } from ".";
import { Post } from "@store/api/interfaces";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn().mockResolvedValue(undefined),
  getItem: jest.fn(),
}));

const SAMPLE = {
  user1: [
    { id: 1, title: "Admin" },
    { id: 2, title: "Test" },
  ],
} as unknown as Record<string, Post[]>;

const FAVORITES_KEY = "favoritesByUser";

describe("favoritesStorage helpers", () => {
  const setItem = AsyncStorage.setItem as jest.Mock;
  const getItem = AsyncStorage.getItem as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saveFavorites comprime y guarda string base64 en AsyncStorage", async () => {
    await saveFavorites(SAMPLE);

    expect(setItem).toHaveBeenCalledWith(
      FAVORITES_KEY,
      expect.any(String)
    );

    const encoded = setItem.mock.calls[0][1] as string;
    const decompressed = pako.inflate(toByteArray(encoded));
    const json = new TextDecoder().decode(decompressed);
    expect(JSON.parse(json)).toEqual(SAMPLE);
  });

  it("loadFavorites devuelve {} cuando no hay nada guardado", async () => {
    getItem.mockResolvedValueOnce(null);

    const result = await loadFavorites();
    expect(result).toEqual({});
  });

  it("loadFavorites lee, descomprime y parsea correctamente", async () => {
    await saveFavorites(SAMPLE);
    const encoded = setItem.mock.calls[0][1] as string;

    getItem.mockResolvedValueOnce(encoded);

    const result = await loadFavorites();
    expect(result).toEqual(SAMPLE);
  });

  it("loadFavorites soporta formato JSON plano (sin comprimir)", async () => {
    getItem.mockResolvedValueOnce(JSON.stringify(SAMPLE));

    const result = await loadFavorites();
    expect(result).toEqual(SAMPLE);
  });
});