import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "src/theme";

export default StyleSheet.create({
  container: {
    margin: spacing.sm,
    position: "relative",
  },
  starWrapper: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    zIndex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xs,
    elevation: 3,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: 80,
    height: "100%",
  },
  body: {
    flex: 1,
    padding: spacing.sm,
    paddingRight: spacing.xxxl,
  },
  title: {
    fontWeight: "bold",
  },
  text: {
    marginTop: spacing.xs,
    color: colors.text,
  },
});