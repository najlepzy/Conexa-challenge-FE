import { useTabIcon } from ".";

const mockIonicons = jest.fn(() => null);

jest.mock(
  "@expo/vector-icons",
  () =>
    new Proxy(
      { __esModule: true },
      {
        get: () => mockIonicons, 
      }
    )
);

describe("useTabIcon", () => {
  it("devuelve el icono outline o filled según focused", () => {
    const el1 = useTabIcon("Favorites", false, 24, "red");
    expect(el1.type).toBe(mockIonicons);
    expect(el1.props).toEqual(
      expect.objectContaining({ name: "star-outline", size: 24, color: "red" })
    );

    const el2 = useTabIcon("Favorites", true, 30, "blue");
    expect(el2.type).toBe(mockIonicons);
    expect(el2.props).toEqual(
      expect.objectContaining({ name: "star", size: 30, color: "blue" })
    );
  });
});