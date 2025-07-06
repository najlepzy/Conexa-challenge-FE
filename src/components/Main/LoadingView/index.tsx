import React from "react";
import { View } from "react-native";
import { INITIAL_SKELETON_COUNT } from "@screens/Home/constants";
import SkeletonPostCard from "../SkeletonPostCard";
import { styles } from "./styles";
import { LoadingViewProps } from "./interfaces";

const LoadingView: React.FC<LoadingViewProps> = ({
  count = INITIAL_SKELETON_COUNT,
}) => (
  <View style={styles.initialLoading}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonPostCard key={i} />
    ))}
  </View>
);

export default LoadingView;