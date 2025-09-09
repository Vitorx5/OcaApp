import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Logout(){
  useEffect(()=>{ /* limpar tokens AsyncStorage */ },[]);
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>Você saiu da conta.</Text>
      <Button title="Voltar ao login" onPress={()=>router.replace("/login")}/>
    </View>
  );
}
