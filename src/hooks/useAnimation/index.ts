import { useRef, useEffect } from "react";
import { Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export function useAnimation(duration = 1000) {
  const animation = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: width,
        duration,
        useNativeDriver: true,
      })
    ).start();
  }, [animation, duration]);

  return animation;
}