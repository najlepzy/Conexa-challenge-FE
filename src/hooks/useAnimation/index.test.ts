import { renderHook } from "@testing-library/react-native";
import { Animated, Dimensions } from "react-native";
import { useAnimation } from ".";

jest.useFakeTimers();

describe("useAnimation hook", () => {
  const { width } = Dimensions.get("window");

  it("inicia un loop infinito con los parámetros correctos", () => {
    const startStub = jest.fn();

    const timingMock = jest
      .spyOn(Animated, "timing")
      .mockReturnValue({ start: startStub } as any);

    const loopMock = jest
      .spyOn(Animated, "loop")
      .mockImplementation((anim) => ({ start: startStub } as any));

    const { result } = renderHook(() => useAnimation(1500));

    expect(result.current).toBeInstanceOf(Animated.Value);

    expect(timingMock).toHaveBeenCalledWith(expect.any(Animated.Value), {
      toValue: width,
      duration: 1500,
      useNativeDriver: true,
    });

    expect(loopMock).toHaveBeenCalledWith(expect.any(Object));

    timingMock.mockRestore();
    loopMock.mockRestore();
  });
});