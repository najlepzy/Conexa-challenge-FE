const mockNavigate = jest.fn();
const mockLoadMore = jest.fn();
const mockSetTerm = jest.fn();
const mockToggleFavorite = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock("../usePosts", () => ({
  usePosts: () => ({
    allPosts: [{ id: 1 }],
    isLoading: false,
    isFetching: false,
    error: null,
    loadMore: mockLoadMore,
  }),
}));

jest.mock("../useSearch", () => ({
  useSearch: () => ({
    filtered: [{ id: 1 }],
    term: "abc",
    setTerm: mockSetTerm,
  }),
}));

jest.mock("../useFavorites", () => ({
  useFavorites: () => ({
    favs: [{ id: 1 }],
    toggleFavorite: mockToggleFavorite,
  }),
}));

import { renderHook, act } from "@testing-library/react-native";
import { useHomeData } from "../useHomeData";

describe("useHomeData", () => {
  it("combina los datos de los hooks internos", () => {
    const { result } = renderHook(() => useHomeData());
    expect(result.current.filtered).toEqual([{ id: 1 }]);
    expect(result.current.term).toBe("abc");
    expect(result.current.favs).toEqual([{ id: 1 }]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.loadMore).toBe(mockLoadMore);
  });

  it("onPress navega a Detail con el id correcto", () => {
    const { result } = renderHook(() => useHomeData());
    act(() => result.current.onPress(5));
    expect(mockNavigate).toHaveBeenCalledWith("Detail", { postId: 5 });
  });
});