import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Login() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const handleLogin = async () => { /* TODO: chamar sua API */ };
  return (
    <View style={s.c}>
      <Text style={s.t}>Bem-vindo</Text>
      <TextInput placeholder="Email" style={s.i} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"/>
      <TextInput placeholder="Senha" style={s.i} value={password} onChangeText={setPassword} secureTextEntry/>
      <Button title="Entrar" onPress={handleLogin}/>
      <TouchableOpacity onPress={()=>router.push("/register" as any)}><Text style={s.l}>Registre-se</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push("/forgot-password")}><Text style={s.l}>Esqueci a senha</Text></TouchableOpacity>
    </View>
  );
}
const s=StyleSheet.create({c:{flex:1,justifyContent:"center",padding:20},t:{fontSize:24,marginBottom:20,textAlign:"center"},i:{borderWidth:1,marginBottom:12,padding:10,borderRadius:8},l:{color:"#2563eb",marginTop:12,textAlign:"center"}});
