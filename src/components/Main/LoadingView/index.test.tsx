import React from "react";
import { render } from "@testing-library/react-native";
import LoadingView from ".";
import SkeletonPostCard from "../SkeletonPostCard";
import { INITIAL_SKELETON_COUNT } from "@screens/Home/constants";

jest.mock("../SkeletonPostCard", () => {
  return jest.fn(() => null);
});

describe("LoadingView", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it("renderiza la cantidad por defecto de SkeletonPostCard", () => {
    render(<LoadingView />);
    expect(SkeletonPostCard).toHaveBeenCalledTimes(INITIAL_SKELETON_COUNT);
  });

  it("renderiza la cantidad personalizada de SkeletonPostCard", () => {
    render(<LoadingView count={5} />);
    expect(SkeletonPostCard).toHaveBeenCalledTimes(5);
  });
});