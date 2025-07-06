import { StyleSheet } from "react-native";
import { colors, spacing, fontSizes } from "src/theme";

export const styles = StyleSheet.create({
  button: {
    marginLeft: spacing.xl,
  },
  text: {
    color: colors.accent,
    fontSize: fontSizes.lg,
  },
});