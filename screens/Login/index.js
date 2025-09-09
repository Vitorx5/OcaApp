import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { styles } from "./styles";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log("Email:", email);
    console.log("Senha:", password);
    alert("Login enviado para API!");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
      />

      <Input
        label="Senha"
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
