// app/registerSuccessful.tsx  (ou conforme seu router)
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import * as Linking from "expo-linking"; // para ler a URL inicial
import { router } from "expo-router";

export default function RegisterSuccessful() {
  const [status, setStatus] = useState<"loading" | "done">("loading");

  useEffect(() => {
    (async () => {
      // token pode vir pela URL do deeplink: oca://registerSuccessful?token=XYZ
      const initialUrl = await Linking.getInitialURL();
      const url = initialUrl; // Linking.getLastestUrl does not exist in expo-linking; use getInitialURL or implement your own helper
      const token = (url && Linking.parse(url).queryParams?.token) as string | undefined;

      if (!token) {
        Alert.alert("Ativação", "Link inválido. Abra o link do e-mail novamente.");
        setStatus("done");
        return;
      }

      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/activate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message ?? "Falha ao ativar.");

        Alert.alert("Conta ativada ✅", "Seu cadastro foi ativado com sucesso!");
        router.replace("/login"); // ou vá para a home autenticada
      } catch (e: any) {
        Alert.alert("Não foi possível ativar", e?.message ?? "Tente novamente.");
      } finally {
        setStatus("done");
      }
    })();
  }, []);

  if (status === "loading") {
    return (
      <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 12 }}>Ativando sua conta...</Text>
      </View>
    );
  }
  return <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}><Text>Pronto.</Text></View>;
}
