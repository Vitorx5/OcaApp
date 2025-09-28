// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" options={{ title: "Splash" }} />
//       <Stack.Screen name="login" />
//       <Stack.Screen name="forgot-password" />
//       <Stack.Screen name="reset" />
//       <Stack.Screen name="logout" />
//     </Stack>
//   );
// }

// _layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import BottomNav from "../src/components/BottomNav";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      <BottomNav />
    </View>
  );
}
