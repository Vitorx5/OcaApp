import React, { useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../src/components/Screen";
import HeaderCard from "../src/components/HeaderCard";
import { Title, Subtitle } from "../src/components/Typography";
import AppButton from "../src/components/AppButton";
import Spacer from "../src/components/Spacer";
import { COLORS, SPACING } from "../src/theme";
// @ts-ignore – usando transformer de SVG já configurado
import Logo from "../assets/images/logo_branco.svg";

export default function Logout() {
  const [sending, setSending] = useState(false);

  const handleConfirm = async () => {
    if (sending) return;
    try {
      setSending(true);

      // (opcional) tenta revogar token no backend
      const token = await AsyncStorage.getItem("@session_token");
      if (token) {
        try {
          await fetch("https://ocaunida.com.br/api/auth/logout", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } catch {}
      }

      // limpa sessão local
      await AsyncStorage.multiRemove(["@session_token", "@session_user"]);

      // volta ao login
      router.replace("/login");
    } catch (e: any) {
      Alert.alert("Não foi possível sair", e?.message ?? "Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const handleCancel = () => router.back();

  return (
    <Screen>
      {/* Header */}
      <View style={styles.headerWrap}>
        <HeaderCard>
          <Logo width={120} height={120} />
        </HeaderCard>
      </View>

      <Spacer size={SPACING.xl} />

      {/* Ícone grande */}
      <View style={styles.iconWrap}>
        <Image
          source={require("../assets/images/logoutIcon.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      {/* Títulos */}
      <View style={styles.titlesWrap}>
        <Title>Deseja sair?</Title>
        <Subtitle>Você tem certeza de que deseja encerrar a sua sessão?</Subtitle>
      </View>

      <Spacer size={SPACING.xl} />

      {/* Botões */}
      <View style={styles.buttonsWrap}>
        <AppButton
          title="SAIR"
          onPress={handleConfirm}
          loading={sending}
          style={[styles.btn, styles.btnGray]}
          textStyle={styles.btnGrayText}
        />
        <Spacer size={SPACING.md} />
        <AppButton
          title="Retornar"
          onPress={handleCancel}
          style={[styles.btn, styles.btnOrange]}
          textStyle={styles.btnYellowText}
          
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: SPACING.xl,
    alignItems: "center",
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  iconWrap: {
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  icon: {
    width: 90,
    height: 90,
    marginBottom: SPACING.xxl,
    tintColor: "#f6990b", // marrom/laranja do mock
  },
  titlesWrap: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.sm,
  },
  buttonsWrap: {
    paddingHorizontal: SPACING.xl,
  },

  // botões (cores iguais ao mock)
  btn: {
    height: 48,
    borderRadius: 10,
  },
  btnGray: {
    backgroundColor: "#cfcfcf",
  },
  btnGrayText: {
    color: "#6b7280",
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  btnOrange: {
    backgroundColor: "#f6990b",
  },
  btnYellowText: {
    color: "#ffffff",
    fontWeight: "800",
    letterSpacing: 0.4,
  },
});
