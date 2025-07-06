import { StyleSheet, Dimensions } from "react-native";
import { colors, spacing, radius } from "src/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: { margin: spacing.sm },
  card: {
    width: width - spacing.xl,
    height: 80,
    borderRadius: radius.md,
    overflow: "hidden",
    backgroundColor: colors.cardBg,
    flexDirection: "row",
  },
  image: {
    width: 80,
    backgroundColor: colors.skeleton,
  },
  body: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: "center",
  },
  title: {
    width: "60%",
    height: 16,
    backgroundColor: colors.skeleton,
    marginBottom: spacing.xs,
    borderRadius: radius.sm,
  },
  textLine: {
    width: "80%",
    height: 12,
    backgroundColor: colors.skeleton,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
  },
  textLineShort: {
    width: "40%",
    height: 12,
    backgroundColor: colors.skeleton,
    borderRadius: radius.sm,
  },
  shimmer: {
    flex: 1,
  },
});