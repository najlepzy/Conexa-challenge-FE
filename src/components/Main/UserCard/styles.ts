import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "src/theme";

export default StyleSheet.create({
  card: {
    padding: spacing.md,
    margin: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    elevation: 1,
  },
  name: {
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },
});