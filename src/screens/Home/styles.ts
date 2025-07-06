import { StyleSheet } from "react-native";
import { spacing } from "src/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  initialLoading: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  skeletonFooterContainer: {
    paddingVertical: spacing.sm,
  },
  errorText: {
    padding: spacing.xl,
    textAlign: "center",
  },
});