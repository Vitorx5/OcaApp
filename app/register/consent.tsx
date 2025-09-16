// app/register/consent.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../../src/components/Screen";
import { Title, Subtitle } from "../../src/components/Typography";
import AppButton from "../../src/components/AppButton";
import Spacer from "../../src/components/Spacer";
import { SPACING } from "../../src/theme";

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

const DRAFT_KEY = "@register_draft";

export default function RegisterConsent() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [draft, setDraft] = useState<Body | null>(null);

  const [acceptedPolicy, setAcceptedPolicy] = useState(false); // obrigatório
  const [acceptZap, setAcceptZap] = useState(false);           // opcional

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(DRAFT_KEY);
        if (!raw) {
          Alert.alert("Formulário não encontrado", "Preencha seus dados novamente.", [
            { text: "OK", onPress: () => router.replace("/register/comum") },
          ]);
          return;
        }
        const parsed: Body = JSON.parse(raw);
        setDraft(parsed);
        setAcceptZap(!!parsed.aceita_contato_whatsapp);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const submit = async () => {
    if (!acceptedPolicy) {
      Alert.alert("Atenção", "Você precisa aceitar a Política de Privacidade para continuar.");
      return;
    }

    if (!draft) {
      Alert.alert("Erro", "Os dados do formulário não foram carregados.");
      return;
    }

    const body: Body = {
      ...draft,
      aceita_contato_whatsapp: !!acceptZap,
    };

    // timeout (15s)
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 15000);

    try {
      setSending(true);
      const resp = await fetch("https://ocaunida.com.br/api/auth/register", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      }).catch((err) => {
        if (err.name === "AbortError") throw new Error("Tempo de conexão esgotado. Verifique sua internet.");
        throw new Error("Não foi possível conectar ao servidor. Tente novamente.");
      });

      clearTimeout(t);

      const data = await resp.json().catch(() => ({} as any));

      // Helper pra validação
      const firstValidation = (() => {
        const errs = (data as any)?.errors;
        if (errs && typeof errs === "object") {
          const flat = Object.values(errs).flat();
          if (flat?.length) return String(flat[0]);
        }
        return null;
      })();

      const msg = String(firstValidation || (data as any)?.message || (data as any)?.error || "").toLowerCase();

      if (!resp.ok) {
        switch (resp.status) {
          case 409:
            if (msg.includes("email")) throw new Error("Este e-mail já está cadastrado. Faça login ou recupere a senha.");
            if (msg.includes("whatsapp") || msg.includes("telefone")) throw new Error("Este WhatsApp já está cadastrado.");
            throw new Error("Dados já cadastrados. Verifique e tente novamente.");
          case 422:
            if (firstValidation) throw new Error(firstValidation);
            throw new Error("Há campos inválidos. Revise o formulário.");
          case 429:
            throw new Error("Muitas tentativas. Aguarde um pouco e tente novamente.");
          default:
            if (resp.status >= 500) throw new Error("Erro no servidor. Tente novamente em alguns minutos.");
            throw new Error((data as any)?.message ?? `Erro ${resp.status}. Tente novamente.`);
        }
      }

      // Sucesso — pendente
      const statusUsuario = (data as any)?.status?.toString().toLowerCase?.() ?? "";
      await AsyncStorage.removeItem(DRAFT_KEY);

      if (statusUsuario.includes("pendente") || statusUsuario.includes("pending")) {
        Alert.alert(
          "Cadastro enviado",
          "Seu cadastro foi criado e está pendente de aprovação. Você já pode tentar entrar.",
          [{ text: "OK", onPress: () => router.replace("/login") }]
        );
      } else {
        Alert.alert("Cadastro concluído", "Conta criada com sucesso!", [
          { text: "OK", onPress: () => router.replace("/login") },
        ]);
      }
    } catch (e: any) {
      Alert.alert("Não foi possível cadastrar", e?.message ?? "Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <Screen/>;

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : insets.top}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: SPACING.xl, paddingBottom: insets.bottom + SPACING.xl }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Title>Política de Privacidade</Title>
          <Subtitle>
            Para continuar, você precisa aceitar nossa Política de Privacidade. Também pode optar por receber
            notificações por WhatsApp (opcional).
          </Subtitle>

          <Spacer size={SPACING.lg} />

          {/* Aqui você pode renderizar um texto maior da política ou abrir um link */}
          {/* Ex.: <Text style={s.policyText}> ... </Text> */}

          <Spacer size={SPACING.xl} />

          <View style={s.row}>
            <Subtitle>Li e aceito a Política de Privacidade</Subtitle>
            <Switch value={acceptedPolicy} onValueChange={setAcceptedPolicy} />
          </View>

          <Spacer size={SPACING.md} />

          <View style={s.row}>
            <Subtitle>Aceito receber notificações por WhatsApp</Subtitle>
            <Switch value={acceptZap} onValueChange={setAcceptZap} />
          </View>

          <View style={{ marginTop: "auto" }}>
            <Spacer size={SPACING.lg} />
            <AppButton title="Concordo e continuar" onPress={submit} loading={sending} />
            <Spacer size={SPACING.md} />
            <AppButton
              title="Voltar"
              onPress={() => router.back()}
              style={{ backgroundColor: "#e5e7eb" }}
              textStyle={{ color: "#111", fontWeight: "700" }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  // policyText: { lineHeight: 20, opacity: 0.8 },
});
