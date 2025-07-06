import { renderHook, act } from "@testing-library/react-native";
import { useSearch } from "../useSearch";

const posts = [
  { id: 1, title: "Hola Mundo", body: "Lorem ipsum" },
  { id: 2, title: "Adiós", body: "Dolor sit" },
] as any;

describe("useSearch", () => {
  it("filtra por título o cuerpo", () => {
    const { result } = renderHook(() => useSearch(posts));

    act(() => result.current.setTerm("hola"));
    expect(result.current.filtered).toEqual([posts[0]]);

    act(() => result.current.setTerm("dolor"));
    expect(result.current.filtered).toEqual([posts[1]]);
  });
});
