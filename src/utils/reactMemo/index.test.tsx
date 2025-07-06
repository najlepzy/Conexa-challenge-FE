import React from "react";
import withMemo from ".";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";

describe("withMemo", () => {
  it("retorna un componente memorizado con el mismo output", () => {
    const Component = () => <TextComponent />;
    const Memoized = withMemo(Component);

    const { getByText } = render(<Memoized />);
    expect(getByText("Texto de prueba")).toBeTruthy(); // ← corregido
  });

  it("mantiene el displayName del componente original", () => {
    const Component = () => <Text>Componente</Text>;
    Component.displayName = "Componente";
    const Memoized = withMemo(Component);

    expect(Memoized.displayName).toBe("Componente");
  });
});

const TextComponent = () => <Text>Texto de prueba</Text>;