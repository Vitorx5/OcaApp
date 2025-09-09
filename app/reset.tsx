import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function Reset(){
  const { token } = useLocalSearchParams<{ token?: string }>();
  const [password,setPassword]=useState("");
  const handleReset = async ()=>{ /* POST /reset-password com token */ };
  return (
    <View style={{flex:1,justifyContent:"center",padding:20}}>
      <TextInput placeholder="Nova senha" secureTextEntry style={{borderWidth:1,marginBottom:12,padding:10,borderRadius:8}} value={password} onChangeText={setPassword}/>
      <Button title="Redefinir senha" onPress={handleReset}/>
    </View>
  );
}
