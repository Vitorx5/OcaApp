import React from "react";
import { TextInput, View, Text } from "react-native";
import { styles } from "./styles";

export function Input({ label, value, onChangeText, placeholder, secureTextEntry }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
}
