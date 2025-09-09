import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // chamada API Server
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Registre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.link}>Esqueci a senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 6 },
  link: { color: "blue", marginTop: 10, textAlign: "center" },
});
