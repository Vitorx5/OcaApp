import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../src/components/Screen";
import AppButton from "../src/components/AppButton";
import { COLORS, SPACING } from "../src/theme";
import { router } from "expo-router";
import { Image } from "expo-image"; // <- aqui

export default function Home() {
  return (
    <Screen>
      <View style={s.wrap}>
        <Image
          source={require("../assets/loading.gif")}
          style={s.gif}
          contentFit="contain"
        />
        <AppButton
          title="Sair"
          onPress={() => router.push("/logout")}
          style={{ alignSelf: "center", width: 180, height: 44 }}
        />
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  gif: { width: 90, height: 90, marginBottom: SPACING.xxl },
});
