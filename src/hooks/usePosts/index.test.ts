import { renderHook, act } from "@testing-library/react-native";
import { PAGE_LIMIT } from "@screens/Home/constants";

jest.mock("@store/api", () => ({
  __esModule: true,
  useGetPostsQuery: jest.fn(),
}));

import { useGetPostsQuery } from "@store/api";
import { usePosts } from "../usePosts";

const mockUseGetPostsQuery = useGetPostsQuery as unknown as jest.Mock;

afterEach(() => jest.clearAllMocks());

describe("usePosts", () => {
  it("agrega la data de la primera página", () => {
    mockUseGetPostsQuery.mockReturnValue({
      data: [{ id: 1 }],
      isLoading: false,
      isFetching: false,
      error: null,
      isSuccess: true,
    });

    const { result } = renderHook(() => usePosts());

    expect(result.current.allPosts).toEqual([{ id: 1 }]);
    expect(result.current.isLoading).toBe(false);
  });

  it("no duplica posts y avanza de página con loadMore", () => {
    mockUseGetPostsQuery
      .mockReturnValueOnce({
        data: Array.from({ length: PAGE_LIMIT }, (_, i) => ({ id: i })),
        isLoading: false,
        isFetching: false,
        error: null,
        isSuccess: true,
      })
      .mockReturnValueOnce({
        data: Array.from({ length: PAGE_LIMIT }, (_, i) => ({
          id: i + PAGE_LIMIT,
        })),
        isLoading: false,
        isFetching: false,
        error: null,
        isSuccess: true,
      });

    const { result, rerender } = renderHook(() => usePosts());

    act(() => result.current.loadMore());
    rerender();

    expect(result.current.allPosts.length).toBe(PAGE_LIMIT * 2);
  });
});