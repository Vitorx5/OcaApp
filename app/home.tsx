import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Screen from "../src/components/Screen";
import AppButton from "../src/components/AppButton";
import { COLORS, SPACING } from "../src/theme";
import { router } from "expo-router";
// import { clearSession } from "../src/storage/session";

export default function Home() {
  const onLogout = async () => {
    try {
      // await clearSession();
    } finally {
      router.replace("/login");
    }
  };

  return (
    <Screen>
      <View style={s.wrap}>
        <Image source={require("../assets/loading.gif")} style={s.gif} />
        <AppButton title="Sair" variant="primary" onPress={onLogout} style={{ marginTop: SPACING.md }} />
      </View>
    </Screen>
  );
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#f0f0f0", justifyContent: "center", alignItems: "center", padding: SPACING.xl },
  gif: { width: 90, height: 90, resizeMode: "contain", marginBottom: SPACING.xxl },
});
