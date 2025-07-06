import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import { useAnimation } from "@hooks/useAnimation";
import type { SkeletonPostCardProps } from "./types";

const SkeletonPostCard: React.FC<SkeletonPostCardProps> = () => {
  const animation = useAnimation(1000);

  return (
    <View style={styles.container} testID="skeleton-card">
      <View style={styles.card}>
        <View style={styles.image} />
        <View style={styles.body}>
          <View style={styles.title} />
          <View style={styles.textLine} />
          <View style={styles.textLineShort} />
        </View>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { transform: [{ translateX: animation }] },
          ]}
        >
          <LinearGradient
            colors={[
              "rgba(255,255,255,0)",
              "rgba(255,255,255,0.6)",
              "rgba(255,255,255,0)",
            ]}
            start={[0, 0.5]}
            end={[1, 0.5]}
            style={styles.shimmer}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default SkeletonPostCard;