import React from "react";
import { render } from "@testing-library/react-native";
import { ActivityIndicator, Image } from "react-native";
import Details from "../Details";
import { ERROR_MESSAGE_DETAIL } from "./constants";

const mockUseGetPostByIdQuery = jest.fn();

jest.mock("@store/api", () => ({
  __esModule: true,
  useGetPostByIdQuery: (id: number) => mockUseGetPostByIdQuery(id),
}));

const route = (postId: number) => ({ params: { postId } } as any);

afterEach(() => jest.clearAllMocks());

describe("Details screen", () => {
  it("muestra spinner mientras carga", () => {
    mockUseGetPostByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { UNSAFE_getByType } = render(<Details route={route(1)} />);
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("muestra mensaje de error si falla", () => {
    mockUseGetPostByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 500 },
    });

    const { getByText } = render(<Details route={route(2)} />);
    expect(getByText(ERROR_MESSAGE_DETAIL)).toBeTruthy();
  });

  it("renderiza título, cuerpo e imagen cuando hay data", () => {
    const post = { id: 1001, title: "Título", body: "Contenido", userId: 1 };
    mockUseGetPostByIdQuery.mockReturnValue({
      data: post,
      isLoading: false,
      error: null,
    });

    const { UNSAFE_getByType, getByText } = render(
      <Details route={route(1001)} />
    );

    expect(getByText("Título")).toBeTruthy();
    expect(getByText("Contenido")).toBeTruthy();

    const img = UNSAFE_getByType(Image);
    expect(img.props.source.uri).toBe("https://picsum.photos/id/1/400/300");
  });
});