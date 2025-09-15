import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../../src/components/Screen";
import HeaderCard from "../../src/components/HeaderCard";
import { Title, Subtitle } from "../../src/components/Typography";
import FormTextInput from "../../src/components/FormTextInput";
import AppButton from "../../src/components/AppButton";
import Spacer from "../../src/components/Spacer";
import { COLORS, SPACING } from "../../src/theme";
// @ts-ignore
import Logo from "../../assets/images/logo_branco.svg";

type Body = {
  nome: string;
  email: string;
  password: string;
  password_confirmation: string;
  whatsapp: string;
  tipo_usuario: "comum" | "voluntario";
  aceita_contato_whatsapp: boolean;
  notificacao_app: boolean;
};

export default function RegisterComum() {
  const [tipoUsuario, setTipoUsuario] = useState<"comum" | "voluntario">("comum");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [aceitaZap, setAceitaZap] = useState(true);
  const [notifica, setNotifica] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("@register_tipo_usuario");
      if (saved === "voluntario" || saved === "comum") setTipoUsuario(saved);
    })();
  }, []);

  const submit = async () => {
    if (!nome || !email || !password || !passwordConf) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }
    if (password !== passwordConf) {
      Alert.alert("Atenção", "As senhas não conferem.");
      return;
    }

    const body: Body = {
      nome,
      email,
      password,
      password_confirmation: passwordConf,
      whatsapp,
      tipo_usuario: tipoUsuario ?? "comum",
      aceita_contato_whatsapp: !!aceitaZap,
      notificacao_app: !!notifica,
    };

    try {
      setSending(true);
      const resp = await fetch("https://ocaunida.com.br/api/auth/register", {
        method: "POST", // API do backend é POST /auth/register
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await resp.json();

      if (!resp.ok) {
        if (resp.status === 422) {
          // pega a primeira msg de erro de validação
          const first = data?.errors && Object.values(data.errors).flat()?.[0];
          throw new Error(first ?? data?.message ?? "Erro de validação.");
        }
        throw new Error(data?.message ?? `Erro ${resp.status}`);
      }

      // sucesso: backend retorna status "pendente" (sem token)
      Alert.alert(
        "Cadastro enviado",
        "Seu cadastro foi criado e está pendente de aprovação. Você já pode tentar entrar.",
        [{ text: "OK", onPress: () => router.replace("/login") }]
      );
    } catch (e: any) {
      Alert.alert("Não foi possível cadastrar", e?.message ?? "Tente novamente.");
    } finally {
      setSending(false);
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
        <Title>Crie sua conta</Title>
        <Subtitle>Preencha o formulário para receber ofertas de ajuda voluntária</Subtitle>

        <Spacer size={SPACING.lg} />

        <FormTextInput
          label="Nome"
          placeholder="Seu nome completo"
          value={nome}
          onChangeText={setNome}
        />
        <Spacer size={SPACING.sm} />
        <FormTextInput
          label="Email"
          placeholder="email@exemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Spacer size={SPACING.sm} />
        <FormTextInput
          label="WhatsApp"
          placeholder="+5592999999999"
          value={whatsapp}
          onChangeText={setWhatsapp}
          keyboardType="phone-pad"
        />
        <Spacer size={SPACING.sm} />
        <FormTextInput
          label="Senha"
          placeholder="*******"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Spacer size={SPACING.sm} />
        <FormTextInput
          label="Confirmar senha"
          placeholder="*******"
          value={passwordConf}
          onChangeText={setPasswordConf}
          secureTextEntry
        />

        <Spacer size={SPACING.md} />

        {/* Se você tiver Switch/Checkbox do seu design system, troque aqui */}
        {/* Por simplicidade, vou manter como campos booleanos no body */}
        {/* Você pode expor dois toggles com seus componentes se quiser */}

        <Spacer size={SPACING.lg} />

        <AppButton title="Cadastrar" onPress={submit} loading={sending} />
        <Spacer size={SPACING.md} />
        <AppButton
          title="Cancelar"
          onPress={() => router.back()}
          style={{ backgroundColor: "#cfcfcf" }}
          textStyle={{ color: "#374151", fontWeight: "700" }}
        />
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
});
