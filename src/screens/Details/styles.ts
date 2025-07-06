import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  spacing,
  radius,
  fontSizes,
  lineHeights,
} from "src/theme";
import { CARD_HEIGHT_MULTIPLIER } from "./constants";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
export const CARD_HEIGHT = SCREEN_HEIGHT * CARD_HEIGHT_MULTIPLIER;

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: spacing.xl,
    paddingTop: spacing.xxxl,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: "hidden",
    elevation: 4,
    minHeight: CARD_HEIGHT,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    paddingRight: spacing.sm,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  divider: {
    width: 80,
    height: 4,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: spacing.md,
    marginBottom: 20,
  },
  body: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.md,
    color: colors.text,
    textAlign: "left",
    paddingHorizontal: spacing.sm,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    padding: spacing.xl,
    textAlign: "center",
    color: colors.error,
  },
});