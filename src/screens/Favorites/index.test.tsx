import React from "react";
import { render } from "@testing-library/react-native";
import Favorites from ".";

const EMPTY_MSG_ES = "No hay favoritos aún.";

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn() as jest.Mock;
const mockNavigate = jest.fn();
const mockPostCard = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (cb: any) => mockUseSelector(cb),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k: string) => (k === "favorites.empty" ? EMPTY_MSG_ES : k),
  }),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock("@store/favorites", () => ({
  removeFavorite: (p: any) => ({ type: "REMOVE_FAV", payload: p }),
}));

jest.mock("@components/Main/PostCard", () => ({
  __esModule: true,
  default: (props: any) => {
    mockPostCard(props);
    return null;
  },
}));

const samplePost = { id: 10, title: "Post", body: "Body", userId: 1 };

afterEach(() => jest.clearAllMocks());

describe("Favorites screen", () => {
  it("muestra mensaje vacío cuando no hay favoritos", () => {
    mockUseSelector.mockImplementation((cb) =>
      cb({
        auth: { email: "admin@test.com" },
        favorites: { itemsByUser: { "admin@test.com": [] } },
      })
    );

    const { getByText } = render(<Favorites />);

    expect(getByText(EMPTY_MSG_ES)).toBeTruthy();
    expect(mockPostCard).not.toHaveBeenCalled();
  });

  it("renderiza PostCard y maneja navigate / dispatch", () => {
    mockUseSelector.mockImplementation((cb) =>
      cb({
        auth: { email: "admin@test.com" },
        favorites: { itemsByUser: { "admin@test.com": [samplePost] } },
      })
    );

    render(<Favorites />);

    expect(mockPostCard).toHaveBeenCalledWith(
      expect.objectContaining({ post: samplePost, isFavorite: true })
    );

    const props = (mockPostCard as jest.Mock).mock.calls[0][0];

    props.onPress(samplePost.id);
    expect(mockNavigate).toHaveBeenCalledWith("Detail", { postId: 10 });

    props.onToggleFavorite();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REMOVE_FAV",
      payload: { email: "admin@test.com", postId: 10 },
    });
  });
});