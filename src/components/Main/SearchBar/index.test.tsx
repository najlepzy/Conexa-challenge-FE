import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Keyboard } from "react-native";
import SearchBar from "./index";

jest.spyOn(Keyboard, "dismiss").mockImplementation(() => {});

describe("SearchBar", () => {
  it("muestra el placeholder por defecto", () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={jest.fn()} />
    );

    expect(getByPlaceholderText("Buscar...")).toBeTruthy();
  });

  it("muestra un placeholder personalizado si se pasa", () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        value=""
        onChangeText={jest.fn()}
        placeholder="Buscar noticias"
      />
    );

    expect(getByPlaceholderText("Buscar noticias")).toBeTruthy();
  });

  it("llama a onChangeText cuando se escribe", () => {
    const onChangeText = jest.fn();

    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={onChangeText} />
    );

    fireEvent.changeText(getByPlaceholderText("Buscar..."), "algo");
    expect(onChangeText).toHaveBeenCalledWith("algo");
  });

  it("cierra el teclado al tocar fuera", () => {
    const { getByTestId } = render(
      <SearchBar value="" onChangeText={jest.fn()} />
    );

    fireEvent.press(getByTestId("searchbar-container"));
    expect(Keyboard.dismiss).toHaveBeenCalled();
  });
});