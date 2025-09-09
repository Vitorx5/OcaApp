import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function LogoutScreen({ navigation }) {
  useEffect(() => {
    // limpar tokens do AsyncStorage
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Você saiu da conta</Text>
      <Button title="Voltar ao login" onPress={() => navigation.replace("Login")} />
    </View>
  );
}
