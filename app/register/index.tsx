import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../../src/components/Screen";
import HeaderCard from "../../src/components/HeaderCard";
import { Title, Subtitle } from "../../src/components/Typography";
import Spacer from "../../src/components/Spacer";
import { COLORS, SPACING } from "../../src/theme";
// @ts-ignore
import Logo from "../../assets/images/logo_branco.svg";

export default function RegisterSelect() {
  const choose = async (tipo: "voluntario" | "comum") => {
    await AsyncStorage.setItem("@register_tipo_usuario", tipo);
    if (tipo === "comum") {
      router.push("./register/comum");
    } else {
      // por ora, voluntário volta para login (ajustaremos depois)
      router.replace("/login");
    }
  };

  return (
    <Screen>
      <View style={s.headerWrap}>
        <HeaderCard>
          <Logo width={120} height={120} />
        </HeaderCard>
      </View>

      <View style={{ paddingHorizontal: SPACING.xl }}>
        <Title>Como você quer se cadastrar?</Title>
        <Subtitle>Escolha o tipo de conta para continuar.</Subtitle>

        <Spacer size={SPACING.xl} />

        <TouchableOpacity onPress={() => choose("voluntario")}>
          <Image source={require("../../assets/images/voluntario.png")} style={s.cardImg} resizeMode="contain" />
        </TouchableOpacity>

        <Spacer size={SPACING.lg} />

        <TouchableOpacity onPress={() => choose("comum")}>
          <Image source={require("../../assets/images/comum.png")} style={s.cardImg} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: SPACING.xl,
    alignItems: "center",
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.background ?? "#fff",
    borderRadius: 14,
    padding: SPACING.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardImg: { width: "auto", height: 140, marginBottom: SPACING.md },
  cardTitle: { textAlign: "center" },
  cardSub: { textAlign: "center", color: COLORS.textMuted, marginTop: 4 },
});
