import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    // chamada API /forgot-password enviando email
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Digite seu email para redefinir senha:</Text>
      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginVertical: 15, padding: 10 }}
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}
