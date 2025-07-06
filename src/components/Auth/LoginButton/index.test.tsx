import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "./index";

describe("Button", () => {
  it("dispara onPress al presionar", () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Ingresar" onPress={onPress} />);
    fireEvent.press(getByText("Ingresar"));
    expect(onPress).toHaveBeenCalled();
  });
});