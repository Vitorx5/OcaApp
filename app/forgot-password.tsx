import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function ForgotPassword(){
  const [email,setEmail]=useState("");
  const submit = async ()=>{ /* POST /forgot-password */ };
  return (
    <View style={{flex:1,justifyContent:"center",padding:20}}>
      <Text>Digite seu email para redefinir a senha:</Text>
      <TextInput style={{borderWidth:1,marginVertical:12,padding:10,borderRadius:8}} value={email} onChangeText={setEmail} placeholder="email"/>
      <Button title="Enviar" onPress={submit}/>
    </View>
  );
}

