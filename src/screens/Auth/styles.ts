import { StyleSheet } from "react-native";
import { colors, spacing, radius, fontSizes } from "src/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
    justifyContent: "center",
    padding: spacing.xl,
    borderColor: colors.border,
    borderWidth: 0.1,
    borderRadius: radius.xl,
    margin: spacing.sm,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.textInverse,
    marginBottom: spacing.xl * 3,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  input: {
    height: 44,
    backgroundColor: colors.inputBgAlt,
    borderRadius: radius.sm,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    color: colors.textInverse,
  },
  switcher: {
    position: "absolute",
    top: 70,
    right: spacing.md,
    zIndex: 1000,
  },
});
