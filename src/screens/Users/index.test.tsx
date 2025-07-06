import React from "react";
import { render } from "@testing-library/react-native";
import { ActivityIndicator } from "react-native";
import Users from "./index";
import { ERROR_MESSAGE } from "./constants";

const mockUseGetUsersQuery = jest.fn();

jest.mock("@store/api", () => {
  const actual = jest.requireActual("@store/api");
  return {
    ...actual,
    useGetUsersQuery: () => mockUseGetUsersQuery(),
  };
});

jest.mock("@components/Main/UserCard", () => {
  const { View } = require("react-native");
  return ({ user }: { user: any }) => <View testID={`user-${user.id}`} />;
});

type HookState = {
  data: { id: number; name: string }[];
  isLoading: boolean;
  error?: Error;
};

const makeHookState = (overrides: Partial<HookState> = {}): HookState => ({
  data: [
    { id: 1, name: "Admin" },
    { id: 2, name: "Admin2" },
  ],
  isLoading: false,
  error: undefined,
  ...overrides,
});

describe("Users screen", () => {
  afterEach(() => jest.clearAllMocks());

  it("muestra ActivityIndicator mientras carga", () => {
    mockUseGetUsersQuery.mockReturnValue(makeHookState({ isLoading: true }));
    const { UNSAFE_getByType } = render(<Users />);
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("muestra mensaje de error cuando falla la petición", () => {
    mockUseGetUsersQuery.mockReturnValue(
      makeHookState({ error: new Error("boom") })
    );
    const { getByText } = render(<Users />);
    expect(getByText(ERROR_MESSAGE)).toBeTruthy();
  });

  it("renderiza la lista de usuarios", () => {
    const state = makeHookState();
    mockUseGetUsersQuery.mockReturnValue(state);

    const { getByTestId, queryAllByTestId } = render(<Users />);

    expect(getByTestId("users-flatlist")).toBeTruthy();
    expect(queryAllByTestId(/^user-/)).toHaveLength(state.data.length);
  });
});