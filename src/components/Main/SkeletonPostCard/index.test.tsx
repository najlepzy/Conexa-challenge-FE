jest.mock("@hooks/useAnimation", () => {
  const { Animated } = require("react-native");
  return { useAnimation: () => new Animated.Value(0) };
});

jest.mock("./styles", () => ({
  container: {},
  card: {},
  image: {},
  body: {},
  title: {},
  textLine: {},
  textLineShort: {},
  shimmer: {},
}));

import React from "react";
import { render } from "@testing-library/react-native";
import { Animated } from "react-native";
import SkeletonPostCard from "../SkeletonPostCard";

describe("SkeletonPostCard", () => {
  it("se renderiza y expone el testID", () => {
    const { getByTestId } = render(<SkeletonPostCard />);
    expect(getByTestId("skeleton-card")).toBeTruthy();
  });

  it("usa el Animated.Value en el transform", () => {
    const { UNSAFE_getAllByType } = render(<SkeletonPostCard />);
    const animatedView = UNSAFE_getAllByType(Animated.View)[0];
    const transform = animatedView.props.style.find(
      (s: any) => s && s.transform
    ).transform;

    expect(transform).toEqual([{ translateX: expect.any(Animated.Value) }]);
  });
});
