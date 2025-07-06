import { StyleSheet } from "react-native";
import { colors, fontSizes, radius, spacing } from "src/theme";

export const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBg,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    color: colors.textInverse,
  },
  errorBorder: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.sm,
    fontSize: fontSizes.md,
  },
});