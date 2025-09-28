import React from "react";
import { TextInput, StyleSheet, Text, View, TextInputProps } from "react-native";
import { COLORS, RADIUS, SPACING } from "../theme";

type FormTextInputProps = TextInputProps & {
  label?: string; // 🔹 Agora você pode usar "label"
};

export default function Listbox({ label, style, ...rest }: FormTextInputProps) {
  return (
    <View style={{ marginBottom: SPACING.md }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...rest}
        style={[styles.input, style]}
        placeholderTextColor="#9aa1a8"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.mutedBg,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    fontSize: 16,
  },
});
