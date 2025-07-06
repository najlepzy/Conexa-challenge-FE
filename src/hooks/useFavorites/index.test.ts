const mockDispatch = jest.fn();

jest.mock("react-redux", () => {
  const actual = jest.requireActual("react-redux");
  return {
    ...actual,
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
  };
});

import { useSelector as useSelectorOrig } from "react-redux";
const useSelectorMock = useSelectorOrig as unknown as jest.Mock;
import { addFavorite, removeFavorite } from "@store/favorites";

import { renderHook, act } from "@testing-library/react-native";
import { EMPTY_POSTS } from "src/constants";
import { useFavorites } from ".";

const samplePost = { id: 42, title: "Post", body: "Lorem", userId: 1 };

describe("useFavorites", () => {
  afterEach(() => jest.clearAllMocks());

  it("retorna EMPTY_POSTS y no despacha sin usuario", () => {
    useSelectorMock.mockImplementation((cb) =>
      cb({ auth: { email: undefined }, favorites: { itemsByUser: {} } })
    );

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favs).toBe(EMPTY_POSTS);
    act(() => result.current.toggleFavorite(samplePost, false));
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("despacha addFavorite cuando no es favorito", () => {
    const state = {
      auth: { email: "ada@lovelace.dev" },
      favorites: { itemsByUser: { "ada@lovelace.dev": [samplePost] } },
    };
    useSelectorMock.mockImplementation((cb) => cb(state));

    const { result } = renderHook(() => useFavorites());

    act(() => result.current.toggleFavorite({ ...samplePost, id: 100 }, false));

    expect(mockDispatch).toHaveBeenCalledWith(
      addFavorite({
        email: "ada@lovelace.dev",
        post: { ...samplePost, id: 100 },
      })
    );
  });

  it("despacha removeFavorite cuando ya es favorito", () => {
    const state = {
      auth: { email: "ada@lovelace.dev" },
      favorites: { itemsByUser: { "ada@lovelace.dev": [samplePost] } },
    };
    useSelectorMock.mockImplementation((cb) => cb(state));

    const { result } = renderHook(() => useFavorites());

    act(() => result.current.toggleFavorite(samplePost, true));

    expect(mockDispatch).toHaveBeenCalledWith(
      removeFavorite({ email: "ada@lovelace.dev", postId: 42 })
    );
  });
});