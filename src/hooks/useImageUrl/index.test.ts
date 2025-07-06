import { useImageUrl } from "../useImageUrl";

describe("useImageUrl", () => {
  it("devuelve la url con medidas por defecto", () => {
    expect(useImageUrl(1234)).toBe("https://picsum.photos/id/234/200/200");
  });

  it("devuelve la url con medidas personalizadas", () => {
    expect(useImageUrl(25, 400, 300)).toBe(
      "https://picsum.photos/id/25/400/300"
    );
  });
});