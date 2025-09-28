import React, { useState } from "react";
import AppButton from "../components/AppButton";

export default function ResetPasswordScreen({ route }) {
  const { token } = route.params || {}; // backend envia token pelo deep link
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    // chamada API /reset-password
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput
        placeholder="Nova senha"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 15, padding: 10 }}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Redefinir Senha" onPress={handleReset} />
    </View>
  );
}
