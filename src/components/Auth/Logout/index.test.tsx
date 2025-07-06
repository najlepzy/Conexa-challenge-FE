import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Logout from ".";
import { useDispatch } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));


describe("Logout", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    jest.clearAllMocks();
  });

  it("muestra el texto de logout", () => {
    const { getByText } = render(<Logout />);
    expect(getByText("logout")).toBeTruthy();
  });

  it("dispara logout al presionar el botón", () => {
    const { getByText } = render(<Logout />);
    fireEvent.press(getByText("logout"));

    expect(dispatch).toHaveBeenCalledWith({
      type: "auth/logout",
    });
  });
});