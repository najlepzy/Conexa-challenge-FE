import { apiSlash } from ".";

describe("apiSlash", () => {
  it("agrega un slash al final si no está presente", () => {
    const url = "https://example.com";
    expect(apiSlash(url)).toBe("https://example.com/");
  });

  it("no modifica la URL si ya termina en slash", () => {
    const url = "https://example.com/";
    expect(apiSlash(url)).toBe("https://example.com/");
  });
});