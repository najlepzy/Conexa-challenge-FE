import { configureStore } from "@reduxjs/toolkit";
import { api } from "./index";
import fetchMock from "jest-fetch-mock";

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.useRealTimers();
});

describe("api endpoints", () => {
  let store: ReturnType<typeof createTestStore>;

  const createTestStore = () =>
    configureStore({
      reducer: { [api.reducerPath]: api.reducer },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    });

  beforeEach(() => {
    fetchMock.resetMocks();
    store = createTestStore();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    store.dispatch(api.util.resetApiState());
  });

  it("getPosts llama a la URL correcta y retorna los datos", async () => {
    const mockResponse = [
      { id: 1, title: "post uno" },
      { id: 2, title: "post dos" },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await store
      .dispatch(
        api.endpoints.getPosts.initiate(
          { page: 1, limit: 2 },
          { subscribe: false }
        )
      )
      .unwrap();

    const req = fetchMock.mock.calls[0][0] as Request | string;
    const url = typeof req === "string" ? req : req.url;

    expect(url).toContain("posts?_page=1&_limit=2");
    expect(result).toEqual(mockResponse);
  });

  it("getPostById llama a la URL correcta", async () => {
    const mockPost = { id: 99, title: "detalle" };
    fetchMock.mockResponseOnce(JSON.stringify(mockPost));

    const result = await store
      .dispatch(
        api.endpoints.getPostById.initiate(99, { subscribe: false })
      )
      .unwrap();

    const req = fetchMock.mock.calls[0][0] as Request | string;
    const url = typeof req === "string" ? req : req.url;

    expect(url).toContain("posts/99");
    expect(result).toEqual(mockPost);
  });

  it("getUsers retorna una lista de usuarios", async () => {
    const mockUsers = [
      { id: 1, name: "Juan" },
      { id: 2, name: "Laura" },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockUsers));

    const result = await store
      .dispatch(
        api.endpoints.getUsers.initiate(undefined, { subscribe: false })
      )
      .unwrap();

    const req = fetchMock.mock.calls[0][0] as Request | string;
    const url = typeof req === "string" ? req : req.url;

    expect(url).toContain("users");
    expect(result).toEqual(mockUsers);
  });
});