import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reducer, { hydrateAuth, login, logout } from ".";

const initialState = {
  isLoggedIn: false,
  email: null,
  loaded: false,
};

describe("authSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve el estado inicial por defecto", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("actualiza el estado al hacer login", () => {
    const action = login("admin@test.com");
    const newState = reducer(initialState, action);

    expect(newState.isLoggedIn).toBe(true);
    expect(newState.email).toBe("admin@test.com");
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "authState",
      JSON.stringify(newState)
    );
  });

  it("resetea el estado al hacer logout", () => {
    const loggedState = {
      ...initialState,
      isLoggedIn: true,
      email: "admin@test.com",
    };

    const newState = reducer(loggedState, logout());

    expect(newState.isLoggedIn).toBe(false);
    expect(newState.email).toBe(null);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "authState",
      JSON.stringify(newState)
    );
  });

  it("hidrata el estado desde hydrateAuth.fulfilled", () => {
    const action = {
      type: hydrateAuth.fulfilled.type,
      payload: {
        isLoggedIn: true,
        email: "test@mail.com",
      },
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      isLoggedIn: true,
      email: "test@mail.com",
      loaded: true,
    });
  });

  it("hydrateAuth async: usa los datos del storage si existen", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({
        isLoggedIn: true,
        email: "from@storage.com",
      })
    );

    const store = configureStore({ reducer });
    const result = await store.dispatch(hydrateAuth()).unwrap();

    expect(result).toEqual({
      isLoggedIn: true,
      email: "from@storage.com",
    });

    expect(store.getState()).toEqual({
      isLoggedIn: true,
      email: "from@storage.com",
      loaded: true,
    });
  });

  it("hydrateAuth async: usa el estado inicial si no hay datos guardados", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const store = configureStore({ reducer });
    const result = await store.dispatch(hydrateAuth()).unwrap();

    expect(result).toEqual(initialState);
    expect(store.getState()).toEqual({
      ...initialState,
      loaded: true,
    });
  });
});
