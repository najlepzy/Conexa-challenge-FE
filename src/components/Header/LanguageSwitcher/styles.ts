import { StyleSheet } from "react-native";
import { colors, spacing, radius, fontSizes } from "src/theme";

export default StyleSheet.create({
  button: {
    marginRight: spacing.xl,
  },
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -radius.sm,
    right: -radius.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs / 2,
    elevation: 2,
  },
  badgeText: {
    fontSize: fontSizes.xs,
    fontWeight: "bold",
    color: colors.accent,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    position: "absolute",
    top: spacing.xxxxl,
    right: 20,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    elevation: 4,
  },
  item: {
    padding: spacing.md,
  },
});