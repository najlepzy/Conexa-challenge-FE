import React from "react";
import { render } from "@testing-library/react-native";
import UserCard from "../UserCard";

const mockUser = {
  id: 1,
  name: "Ada Lovelace",
  email: "ada@lovelace.dev",
  phone: "+44 1234 567890",
};

describe("UserCard", () => {
  it("muestra nombre, email y teléfono del usuario", () => {
    const { getByText } = render(<UserCard user={mockUser} />);

    expect(getByText("Ada Lovelace")).toBeTruthy();
    expect(getByText("ada@lovelace.dev")).toBeTruthy();
    expect(getByText("+44 1234 567890")).toBeTruthy();
  });
});
