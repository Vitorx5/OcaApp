import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // app/_layout.tsx
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Splash" }} />
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset" />
      <Stack.Screen name="logout" />

      {/* screens aninhadas */}
      <Stack.Screen name="register/index" options={{ title: "Como deseja se cadastrar?" }} />
      <Stack.Screen name="register/comum" options={{ title: "Cadastro Comum" }} />
      <Stack.Screen name="register/voluntario" options={{ title: "Cadastro Voluntário" }} />
      <Stack.Screen name="register/consent" options={{ title: "Consentimento" }} />
    </Stack>

  );
}
