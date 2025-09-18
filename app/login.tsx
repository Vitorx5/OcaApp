import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import * as Location from "expo-location";
import * as Device from "expo-device";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../src/components/Screen";
import HeaderCard from "../src/components/HeaderCard";
import { Title, Subtitle } from "../src/components/Typography";
import FormTextInput from "../src/components/FormTextInput";
import AppButton from "../src/components/AppButton";
import Spacer from "../src/components/Spacer";
import { COLORS, SPACING, TYPO } from "../src/theme";
import Logo from "../assets/images/logo_branco.svg";

function buildDeviceName() {
  const s = [Device.osName ?? "OS", Device.osVersion ?? "", "-", Device.brand ?? "", Device.modelName ?? ""]
    .join(" ").replace(/\s+/g, " ").trim();
  return s.slice(0, 120) || "expo";
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [sending, setSending] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { Alert.alert("Atenção", "Informe e-mail e senha."); return; }
    try {
      setSending(true);
      const device_name = buildDeviceName();
      let latitude: number | undefined, longitude: number | undefined;
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced});
          latitude = pos.coords.latitude; longitude = pos.coords.longitude;
        }
      } catch {}
      const resp = await fetch("https://ocaunida.com.br/api/auth/login", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, device_name, latitude, longitude }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        if (resp.status === 401) throw new Error("E-mail ou senha inválidos.");
        if (resp.status === 403) throw new Error(data?.message ?? "Conta não está ativa.");
        if (resp.status === 422) {
          const first = data?.errors && (Object.values(data.errors as Record<string,string[]>).flat()?.[0]);
          throw new Error(first ?? data?.message ?? "Erro de validação.");
        }
        throw new Error(data?.message ?? `Erro ${resp.status}`);
      }
      // TODO: saveSession(data.token, data.user)
      router.replace("./home");
    } catch (e:any) {
      Alert.alert("Não foi possível entrar", e?.message ?? "Tente novamente.");
    } finally { setSending(false); }
  };

  return (
    <Screen>
      {/* Header */}
      <View style={{ paddingHorizontal: SPACING.xl, alignItems: "center" }}>
        <HeaderCard>
          <Logo width={120} height={120} />
        </HeaderCard>
      </View>

      {/* Títulos */}
      <View style={styles.titlesWrap}>
        <Title>Acesse sua conta</Title>
        <Subtitle>Insira o email e senha para logar</Subtitle>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={TYPO.label}>Email</Text>
        <FormTextInput
          placeholder="email@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View style={styles.rowBetween}>
          <Text style={TYPO.label}>Senha</Text>
          <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text style={styles.forgot}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <View>
          <FormTextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            style={{ paddingRight: 44, marginBottom: 0 }}
          />
          <TouchableOpacity onPress={() => setShowPass(v => !v)} style={styles.eyeBtn}>
            <MaterialCommunityIcons name={showPass ? "eye-off-outline" : "eye-outline"} size={22} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <Spacer size={SPACING.md} />
        <AppButton title="Acesse" onPress={handleLogin} loading={sending} />

        <Spacer size={SPACING.lg} />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.footerText}>Não tem conta? </Text>
          <TouchableOpacity
            onPress={() => router.push("./register")}
            hitSlop={8}
            accessibilityRole="button"
          >
            <Text style={styles.footerLink}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  titlesWrap: { paddingHorizontal: SPACING.xl, marginTop: SPACING.lg },
  form: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, gap: SPACING.sm },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8, marginTop: 6 },
  forgot: { color: COLORS.textMuted, fontWeight: "700" },
  eyeBtn: { position: "absolute", right: 12, top: 12, height: 24, width: 32, alignItems: "center", justifyContent: "center" },
  footerText: { textAlign: "center", color: COLORS.textMuted },
  footerLink: { color: "#f29f05", fontWeight: "800" },
});
