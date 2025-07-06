import React, { createRef } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TextInput } from "react-native";

import { Input } from "./index";

describe("Input", () => {
  it("permite escribir texto", () => {
    const onChangeText = jest.fn();

    const { getByPlaceholderText } = render(
      <Input placeholder="Email" value="" onChangeText={onChangeText} />
    );

    const input = getByPlaceholderText("Email");

    fireEvent.changeText(input, "admin@test.com");
    expect(onChangeText).toHaveBeenCalledWith("admin@test.com");
  });

  it("muestra mensaje de error si se le pasa", () => {
    const { getByText } = render(
      <Input
        placeholder="Contraseña"
        value=""
        onChangeText={() => {}}
        error="Campo obligatorio"
      />
    );

    expect(getByText("Campo obligatorio")).toBeTruthy();
  });

  it("forwardea la ref correctamente", () => {
    const ref = createRef<TextInput>();
    render(
      <Input ref={ref} placeholder="Usuario" value="" onChangeText={() => {}} />
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(TextInput);
  });
});