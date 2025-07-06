import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "src/theme";

export default StyleSheet.create({
  container: {
    padding: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    height: 40,
  },
});