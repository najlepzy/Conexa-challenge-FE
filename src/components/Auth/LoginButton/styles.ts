import { StyleSheet } from "react-native";
import { colors, fontSizes, radius, spacing } from "src/theme";

export const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primaryLight,
    paddingVertical: spacing.xl,
    borderRadius: radius.md,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  txt: {
    color: colors.textInverse,
    fontWeight: "600",
    fontSize: fontSizes.lg,
  },
});