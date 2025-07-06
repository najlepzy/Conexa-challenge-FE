import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PostsList from "./index";
import { Post } from "@store/api/interfaces";

jest.mock("@hooks/useAnimation", () => ({
  useAnimation: () => 0,
}));

const mockPosts: Post[] = [
  { id: 1, title: "Título 1", body: "Contenido 1", userId: 1 },
  { id: 2, title: "Título 2", body: "Contenido 2", userId: 2 },
];

describe("PostsList", () => {
  it("renderiza los posts correctamente", () => {
    const { getByText } = render(
      <PostsList
        data={mockPosts}
        favs={[]}
        onToggleFav={jest.fn()}
        onPress={jest.fn()}
        onEndReached={jest.fn()}
        isFetching={false}
      />
    );

    expect(getByText("Título 1")).toBeTruthy();
    expect(getByText("Título 2")).toBeTruthy();
  });

  it("llama a onPress cuando se toca un post", () => {
    const onPress = jest.fn();

    const { getAllByTestId } = render(
      <PostsList
        data={mockPosts}
        favs={[]}
        onToggleFav={jest.fn()}
        onPress={onPress}
        onEndReached={jest.fn()}
        isFetching={false}
      />
    );

    fireEvent.press(getAllByTestId("card-button")[0]);
    expect(onPress).toHaveBeenCalledWith(1);
  });

  it("llama a onToggleFav cuando se toca la estrella", () => {
    const onToggleFav = jest.fn();

    const { getAllByTestId } = render(
      <PostsList
        data={mockPosts}
        favs={[]}
        onToggleFav={onToggleFav}
        onPress={jest.fn()}
        onEndReached={jest.fn()}
        isFetching={false}
      />
    );

    fireEvent.press(getAllByTestId("favorite-button")[0]);
    expect(onToggleFav).toHaveBeenCalledWith(mockPosts[0], false);
  });

  it("muestra el footer con SkeletonPostCard si isFetching es true", () => {
    const { getAllByTestId } = render(
      <PostsList
        data={mockPosts}
        favs={[]}
        onToggleFav={jest.fn()}
        onPress={jest.fn()}
        onEndReached={jest.fn()}
        isFetching={true}
      />
    );

    expect(getAllByTestId("skeleton-card").length).toBeGreaterThan(0);
  });
});