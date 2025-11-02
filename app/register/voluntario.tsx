// app/register/comum.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Screen from "../../src/components/Screen";
import HeaderCard from "../../src/components/HeaderCard";
import { Title, Subtitle } from "../../src/components/Typography";
import FormTextInput from "../../src/components/FormTextInput";
import AppButton from "../../src/components/AppButton";
import Spacer from "../../src/components/Spacer";
import { SPACING } from "../../src/theme";
// @ts-ignore
import Logo from "../../assets/images/logo_branco.svg";
import { Picker } from "@react-native-picker/picker";



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

type Profissao = { id: number; profissao: string; descricao?: string | null };

// --- estado (junto aos outros useState do formulário) ---
const [profissoes, setProfissoes] = useState<Profissao[]>([]);
const [profissaoId, setProfissaoId] = useState<number | null>(null);
const [loadingProf, setLoadingProf] = useState<boolean>(true);
const [errProf, setErrProf] = useState<string | null>(null);

// --- carregar da API (em useEffect) ---
useEffect(() => {
  let mounted = true;
  async function load() {
    try {
      setLoadingProf(true);
      setErrProf(null);
      // pode usar env também: `${process.env.EXPO_PUBLIC_API_URL}/api/profissoes?per_page=all`
      const res = await fetch("https://ocaunida.com.br/api/profissoes?per_page=all", {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      // sua API pode retornar {data:[...]} (quando per_page=all) ou um paginator {data:[...], ...}
      const list: Profissao[] = Array.isArray(json) ? json : (json.data ?? []);
      if (mounted) setProfissoes(list);
    } catch (e: any) {
      if (mounted) setErrProf(e?.message || "Falha ao carregar profissões.");
    } finally {
      if (mounted) setLoadingProf(false);
    }
  }
  load();
  return () => {
    mounted = false;
  };
}, []);

const DRAFT_KEY = "@register_draft";

export default function RegisterComum() {
  const insets = useSafeAreaInsets();

  const [tipoUsuario, setTipoUsuario] = useState<"comum" | "voluntario">("comum");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [aceitaZap, setAceitaZap] = useState(true); // opcional, será confirmado na tela de consentimento
  const [notifica, setNotifica] = useState(true);   // opcional, mantido para push/app futuramente

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("@register_tipo_usuario");
      if (saved === "voluntario" || saved === "comum") setTipoUsuario(saved);
    })();
  }, []);

  const goToConsent = async () => {
    if (!nome || !email || !password || !passwordConf) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }
    if (password !== passwordConf) {
      Alert.alert("Atenção", "As senhas não conferem.");
      return;
    }

    const draft: Body = {
      nome,
      email,
      password,
      password_confirmation: passwordConf,
      whatsapp,
      tipo_usuario: tipoUsuario ?? "voluntario",
      aceita_contato_whatsapp: !!aceitaZap, // valor inicial (poderá ser alterado na próxima tela)
      notificacao_app: !!notifica,
    };

    try {
      await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      router.push("/register/consent");
    } catch {
      Alert.alert("Erro", "Não foi possível avançar. Tente novamente.");
    }
  };

  return (
    <Screen>
      {/* Cabeçalho */}
      <View style={s.headerWrap}>
        <HeaderCard>
          <Logo width={120} height={120} />
        </HeaderCard>
      </View>

      {/* Conteúdo rolável e que respeita teclado */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : insets.top}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + SPACING.xl }]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={{ paddingHorizontal: SPACING.xl, flexGrow: 1 }}>
              <Title>Crie sua conta</Title>
              <Subtitle>Preencha o formulário para ofertar ajuda voluntária</Subtitle>

              <Spacer size={SPACING.lg} />

              <FormTextInput
                placeholder="Seu nome completo"
                value={nome}
                onChangeText={setNome}
                returnKeyType="next"
              />
              <Spacer size={SPACING.sm} />

              <FormTextInput
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
              <Spacer size={SPACING.sm} />

              <FormTextInput
                placeholder="+5592999999999"
                value={whatsapp}
                onChangeText={setWhatsapp}
                keyboardType="phone-pad"
                returnKeyType="next"
              />
              <Spacer size={SPACING.sm} />

              <FormTextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="next"
              />
              <Spacer size={SPACING.sm} />

              <FormTextInput
                placeholder="Confirmar senha"
                value={passwordConf}
                onChangeText={setPasswordConf}
                secureTextEntry
                returnKeyType="done"
              />

                {/* === CAMPO: Profissão === */}
                <View style={{ marginTop: 16 }}>
                  <Text style={s.label}>profissão</Text>

                  {loadingProf ? (
                    <View style={s.pickerBox}>
                      <ActivityIndicator />
                    </View>
                  ) : errProf ? (
                    <View style={s.pickerBox}>
                      <Text style={{ padding: 10 }}>Não foi possível carregar. Tente novamente.</Text>
                    </View>
                  ) : (
                    <View style={s.pickerBox}>
                      <Picker
                        selectedValue={profissaoId}
                        onValueChange={(val) => setProfissaoId(val)}
                        dropdownIconColor="#777"
                        mode="dropdown"
                      >
                        <Picker.Item label="Escolha a opção desejada" value={null} />
                        {profissoes.map((p) => (
                          <Picker.Item key={p.id} label={p.profissao} value={p.id} />
                        ))}
                      </Picker>
                    </View>
                  )}
                </View>


              
              {/* Rodapé da tela (fica no fim, mas rola quando faltar espaço) */}
              <View style={{ marginTop: "auto" }}>
                <Spacer size={SPACING.lg} />
                <AppButton title="Cadastrar" onPress={goToConsent} />
                <Spacer size={SPACING.md} />
                <AppButton
                  title="Cancelar"
                  onPress={() => router.back()}
                  style={{ backgroundColor: "#cfcfcf" }}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
    );
  } //  <— FECHA a função aqui
const s = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: SPACING.xl,
    alignItems: "center",
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  scrollContent: {
    flexGrow: 1, // permite empurrar o footer e ainda assim rolar
    paddingTop: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textTransform: "capitalize",
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    overflow: "hidden",
  },
});
