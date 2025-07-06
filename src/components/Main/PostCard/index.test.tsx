import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PostCard from "./index";
import { Post } from "@store/api/interfaces";

const post: Post = {
  id: 1,
  title: "Título",
  body: "Contenido",
  userId: 123,
};

describe("PostCard", () => {
  it("muestra correctamente título y contenido", () => {
    const { getByText } = render(
      <PostCard
        post={post}
        onPress={jest.fn()}
        isFavorite={false}
        onToggleFavorite={jest.fn()}
      />
    );

    expect(getByText("Título")).toBeTruthy();
    expect(getByText("Contenido")).toBeTruthy();
  });

  it("dispara onToggleFavorite al tocar la estrella", () => {
    const onToggleFavorite = jest.fn();
    const { getByTestId } = render(
      <PostCard
        post={post}
        onPress={jest.fn()}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />
    );

    fireEvent.press(getByTestId("favorite-button"));
    expect(onToggleFavorite).toHaveBeenCalledWith(post);
  });

  it("dispara onPress al tocar la tarjeta", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <PostCard
        post={post}
        onPress={onPress}
        isFavorite={false}
        onToggleFavorite={jest.fn()}
      />
    );

    fireEvent.press(getByTestId("card-button"));
    expect(onPress).toHaveBeenCalledWith(post.id);
  });
});