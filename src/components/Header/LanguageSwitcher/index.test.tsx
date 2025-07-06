import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import i18n from "@utils/translate/i18n";
import LanguageSwitcher from ".";

describe("LanguageSwitcher", () => {
  it("muestra el código del idioma actual", () => {
    const { getByText } = render(<LanguageSwitcher />);
    expect(getByText("EN")).toBeTruthy();
  });

  it("abre el modal al tocar el botón", () => {
    const { getByTestId, getByText } = render(<LanguageSwitcher />);
    fireEvent.press(getByTestId("language-btn"));
    expect(getByText("Español")).toBeTruthy();
  });

  it("cambia el idioma al seleccionar una opción", async () => {
    const { getByTestId, getByText } = render(<LanguageSwitcher />);

    fireEvent.press(getByTestId("language-btn"));
    fireEvent.press(getByText("Español"));

    await waitFor(() => {
      expect(i18n.changeLanguage).toHaveBeenCalledWith("es");
    });
  });
});