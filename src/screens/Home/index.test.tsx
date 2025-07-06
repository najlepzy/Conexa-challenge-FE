import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import Home from "./index";

jest.mock("@components/index", () => {
  const React = require("react");
  const { View, TextInput, TouchableOpacity } = require("react-native");

  return {
    LoadingView: () => <View testID="loading-view" />,
    ErrorView: () => <View testID="error-view" />,
    SearchBar: ({
      value,
      onChangeText,
      placeholder,
    }: {
      value: string;
      onChangeText: (t: string) => void;
      placeholder: string;
    }) => (
      <TextInput
        testID="search-bar"
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    ),
    PostsList: ({
      data,
      onEndReached,
      onToggleFav,
      onPress,
    }: {
      data: any[];
      onEndReached: () => void;
      onToggleFav: (id: string) => void;
      onPress: (id: string) => void;
    }) => (
      <View testID="posts-list">
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            testID={`post-${item.id}`}
            onPress={() => onPress(item.id)}
            onLongPress={() => onToggleFav(item.id)}
          />
        ))}
        <View testID="sentinel" onLayout={onEndReached} />
      </View>
    ),
  };
});

const mockUseHomeData = jest.fn();
jest.mock("@hooks/useHomeData", () => ({
  useHomeData: () => mockUseHomeData(),
}));

const makeHookState = (overrides = {}) => ({
  filtered: [{ id: "1", title: "Post 1" }],
  term: "",
  setTerm: jest.fn(),
  favs: [],
  toggleFavorite: jest.fn(),
  isLoading: false,
  isFetching: false,
  error: null,
  loadMore: jest.fn(),
  onPress: jest.fn(),
  ...overrides,
});

describe("Home screen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("muestra LoadingView cuando isLoading = true", () => {
    mockUseHomeData.mockReturnValue(makeHookState({ isLoading: true }));
    const { getByTestId } = render(<Home />);
    expect(getByTestId("loading-view")).toBeTruthy();
  });

  it("muestra ErrorView cuando error != null", () => {
    mockUseHomeData.mockReturnValue(makeHookState({ error: new Error("ups") }));
    const { getByTestId } = render(<Home />);
    expect(getByTestId("error-view")).toBeTruthy();
  });

  it("renderiza SearchBar, PostsList y dispara callbacks", () => {
    const state = makeHookState();
    mockUseHomeData.mockReturnValue(state);
    const { getByTestId } = render(<Home />);

    fireEvent.changeText(getByTestId("search-bar"), "react");
    expect(state.setTerm).toHaveBeenCalledWith("react");

    act(() => {
      getByTestId("sentinel").props.onLayout();
    });
    expect(state.loadMore).toHaveBeenCalled();

    fireEvent.press(getByTestId("post-1"));
    expect(state.onPress).toHaveBeenCalledWith("1");

    fireEvent(getByTestId("post-1"), "longPress");
    expect(state.toggleFavorite).toHaveBeenCalledWith("1");
  });
});