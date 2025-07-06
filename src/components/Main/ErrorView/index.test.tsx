import React from "react";
import { render } from "@testing-library/react-native";

const MSG_ES = "Error cargando noticias";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k: string) => (k === "home.loadError" ? MSG_ES : k),
  }),
}));

import ErrorView from ".";

describe("ErrorView", () => {
  it("usa el mensaje por defecto", () => {
    const { getByText } = render(<ErrorView />);
    expect(getByText(MSG_ES)).toBeTruthy();
  });

  it("muestra el mensaje pasado por props", () => {
    const custom = "Error personalizado";
    const { getByText } = render(<ErrorView message={custom} />);
    expect(getByText(custom)).toBeTruthy();
  });
});