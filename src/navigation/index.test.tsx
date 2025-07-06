import React from "react";
import { render } from "@testing-library/react-native";
import AppNavigator from ".";
import StackNavigator from "./StackNavigator";
import TabNavigator from "./TabNavigator";

let mockCapturedOptions: ((p: any) => any) | null = null;

jest.mock("@react-navigation/stack", () => {
  const MockNav =
    () =>
    ({ children }: any) =>
      <>{children}</>;

  return {
    __esModule: true,
    createStackNavigator: () => ({
      Navigator: MockNav(),
      Screen: ({ children, options }: any) => {
        if (typeof options === "function" && !mockCapturedOptions) {
          mockCapturedOptions = options;
        }
        return <>{children}</>;
      },
    }),
  };
});

jest.mock("@react-navigation/bottom-tabs", () => {
  const MockNav =
    () =>
    ({ children }: any) =>
      <>{children}</>;
  return {
    __esModule: true,
    createBottomTabNavigator: () => ({
      Navigator: MockNav(),
      Screen: ({ children }: any) => <>{children}</>,
    }),
  };
});

jest.mock("@react-navigation/native", () => ({
  __esModule: true,
  getFocusedRouteNameFromRoute: () => "News",
}));

const mockT = jest.fn((k) => k);
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: mockT }),
}));

jest.mock("@components/Auth/Logout", () => () => null);
jest.mock("@components/Header/LanguageSwitcher", () => () => null);
jest.mock("@screens/Details", () => () => null);
jest.mock("@screens/index", () => ({
  Home: () => null,
  Users: () => null,
  Favorites: () => null,
}));
jest.mock("@hooks/useTabIcon", () => ({
  useTabIcon: jest.fn(() => null),
}));

beforeEach(() => {
  mockT.mockClear();
  mockCapturedOptions = null;
});

describe("navegadores", () => {
  it("AppNavigator se monta sin errores", () => {
    expect(() => render(<AppNavigator />)).not.toThrow();
  });

  it("StackNavigator registra la clave de detalle en i18n", () => {
    render(<StackNavigator />);
    expect(mockT).toHaveBeenCalledWith("detailTitle");
  });

  it("StackNavigator: options genera título y headers", () => {
    render(<StackNavigator />);

    expect(typeof mockCapturedOptions).toBe("function");

    const opts = mockCapturedOptions!({
      route: { name: "Main", key: "Main", params: undefined },
    });

    expect(opts.title).toBe("tabs.News");
    expect(mockT).toHaveBeenCalledWith("tabs.News");
    expect(opts.headerLeft()).not.toBeNull();
    expect(opts.headerRight()).not.toBeNull();
  });

  it("TabNavigator traduce títulos de tabs", () => {
    render(<TabNavigator />);
    expect(mockT).toHaveBeenCalledWith("tabs.News");
    expect(mockT).toHaveBeenCalledWith("tabs.Users");
    expect(mockT).toHaveBeenCalledWith("tabs.Favorites");
  });
});