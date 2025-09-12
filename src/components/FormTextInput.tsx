import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { COLORS, RADIUS, SPACING } from "../theme";

export default function FormTextInput(props: TextInputProps) {
  return <TextInput {...props} style={[styles.input, props.style]} placeholderTextColor="#9aa1a8" />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.mutedBg,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    fontSize: 16,
  },
});
