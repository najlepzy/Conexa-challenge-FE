import { store } from ".";
import { addFavorite } from "./favorites";

describe("store", () => {
  it("crea el store correctamente", () => {
    expect(store).toBeDefined();
  });

  it("puede enviar una acción sin errores", () => {
    expect(() =>
      store.dispatch(
        addFavorite({
          email: "admin@test.com",
          post: {
            id: 1,
            title: "test",
            body: "mockContent",
            userId: 123,
          },
        })
      )
    ).not.toThrow();
  });
});