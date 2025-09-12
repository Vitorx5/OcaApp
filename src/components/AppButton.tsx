import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { COLORS, RADIUS, SPACING, TYPO } from "../theme";

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: "primary" | "dark" | "outline";
};

export default function AppButton({ title, onPress, loading, disabled, style, textStyle, variant = "primary" }: Props) {
  const variantStyle =
    variant === "primary"
      ? styles.primary
      : variant === "dark"
      ? styles.dark
      : styles.outline;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.base, variantStyle, (disabled || loading) && styles.disabled, style]}
      activeOpacity={0.9}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? COLORS.dark : COLORS.primaryText} />
      ) : (
        <Text style={[TYPO.button, variant === "outline" && { color: COLORS.dark }, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  primary: { backgroundColor: COLORS.primary },
  dark: { backgroundColor: COLORS.dark },
  outline: { backgroundColor: "transparent", borderWidth: 1, borderColor: COLORS.border },
  disabled: { opacity: 0.7 },
});
