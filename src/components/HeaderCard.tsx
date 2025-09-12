import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS, RADIUS, SPACING } from "../theme";

export default function HeaderCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: COLORS.brandYellow,
    borderRadius: RADIUS.xl,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.xl,
  },
});
