import React from "react";
import { Text, View } from "react-native";
import Button from "./components/Button/index";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <MyInput placeholder="Digite seu e-mail" />
      <MyInput placeholder="Digite sua senha" />
      <Button text="Entrar" onPress={() => alert("Botão pressionado!")} />
    </SafeAreaView>
  );
}
