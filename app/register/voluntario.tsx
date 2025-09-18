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
  TouchableOpacity,
  CheckBox,
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

export default function RegisterComum() {
  const insets = useSafeAreaInsets();

  const [tipoUsuario, setTipoUsuario] = useState<"comum" | "voluntario">(
    "comum"
  );
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [aceitaZap, setAceitaZap] = useState(true); // opcional, será confirmado na tela de consentimento
  const [notifica, setNotifica] = useState(true); // opcional, mantido para push/app futuramente

  // PIX state
  const [pixTipo, setPixTipo] = useState<
    "cpf" | "numero" | "email" | "aleatoria"
  >("cpf");
  const [pixChave, setPixChave] = useState("");
  // Registro profissional
  const [registroProfissional, setRegistroProfissional] = useState("");
  // Termos e notificações
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [aceitaNotificacoes, setAceitaNotificacoes] = useState(false);

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

    try {
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
      await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      router.push("/register/consent");
    } catch {
      Alert.alert("Erro", "Não foi possível avançar. Tente novamente.");
    }
  };

  // Remover função duplicada e não implementada setPixTipo
  // function setPixTipo(arg0: any): void {
  //   throw new Error("Function not implemented.");
  // }

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
            contentContainerStyle={[
              s.scrollContent,
              { paddingBottom: insets.bottom + SPACING.xl },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={{ paddingHorizontal: SPACING.xl, flexGrow: 1 }}>
              <Title>Crie sua conta</Title>
              <Subtitle>
                Preencha o formulário para ofertar ajuda voluntária
              </Subtitle>

              <Spacer size={SPACING.lg} />

              <FormTextInput
                label="Nome"
                placeholder="Seu nome completo"
                value={nome}
                onChangeText={setNome}
                returnKeyType="next"
              />
              <Spacer size={SPACING.sm} />

              <FormTextInput
                label="Email"
                placeholder="email@exemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
              <Spacer size={SPACING.sm} />

              <FormTextInput
                label="WhatsApp"
                placeholder="+5592999999999"
                value={whatsapp}
                onChangeText={setWhatsapp}
                keyboardType="phone-pad"
                returnKeyType="next"
              />
              <Spacer size={SPACING.sm} />

              <FormTextInput
                label="Senha"
                placeholder="*******"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="next"
              />
              <Spacer size={SPACING.sm} />

              <FormTextInput
                label="Confirmar senha"
                placeholder="*******"
                value={passwordConf}
                onChangeText={setPasswordConf}
                secureTextEntry
                returnKeyType="done"
              />

              {/* PIX */}
              <Text style={s.sectionTitle}>PIX</Text>
              <View style={s.pixOptions}>
                {["cpf", "numero", "email", "aleatoria"].map((tipo) => (
                  <TouchableOpacity
                    key={tipo}
                    style={[s.pixButton, pixTipo === tipo && s.pixButtonActive]}
                    onPress={() => setPixTipo(tipo as typeof pixTipo)}
                  >
                    <Text
                      style={[
                        s.pixButtonText,
                        pixTipo === tipo && s.pixButtonTextActive,
                      ]}
                    >
                      {tipo.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <FormTextInput
                label="Chave PIX"
                placeholder="Digite sua chave"
                value={pixChave}
                onChangeText={setPixChave}
              />

              <Spacer size={SPACING.lg} />

              {/* Registro Profissional */}
              <FormTextInput
                placeholder="OAB, CRM, CRS..."
                value={registroProfissional}
                onChangeText={setRegistroProfissional}
              />

              <Spacer size={SPACING.lg} />

              {/* Política de privacidade */}
              <Text style={s.sectionTitle}>Política de Privacidade</Text>
              <View style={s.privacyBox}>
                <ScrollView>
                  <Text style={s.privacyText}>
                    Esta Política de Privacidade descreve, de forma clara e
                    transparente, como Nativo Desenvolvimentos (CNPJ
                    [xx.xxx.xxx/xxxx-xx]), na qualidade de controladora, coleta,
                    utiliza, armazena e compartilha dados pessoais dos usuários
                    do [Nome do App/Site], em conformidade com a Lei Geral de
                    Proteção de Dados – LGPD (Lei nº 13.709/2018).{"\n\n"}
                    Tratamos apenas as informações necessárias para prestar e
                    aprimorar nossos serviços (por exemplo, dados de
                    identificação, contato, navegação e cookies), com bases
                    legais como execução de contrato, cumprimento de obrigações
                    legais e legítimo interesse.
                  </Text>
                </ScrollView>
              </View>

              {/* Checkboxes */}
              <View style={s.checkboxRow}>
                <CheckBox
                  value={aceitaTermos}
                  onValueChange={setAceitaTermos}
                />
                <Text style={s.checkboxLabel}>
                  Li e concordo com os Termos de Uso e Política de Privacidade
                </Text>
              </View>

              <View style={s.checkboxRow}>
                <CheckBox
                  value={aceitaNotificacoes}
                  onValueChange={setAceitaNotificacoes}
                />
                <Text style={s.checkboxLabel}>
                  Aceito receber notificações do app e ofertas promocionais
                </Text>
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
}

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
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
  pixOptions: {
    flexDirection: "row",
    marginBottom: 10,
  },
  pixButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginRight: 8,
  },
  pixButtonActive: {
    backgroundColor: "#ff9900",
  },
  pixButtonText: {
    fontSize: 12,
    color: "#333",
  },
  pixButtonTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  privacyText: {
    fontSize: 12,
    color: "#444",
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 6,
    fontSize: 13,
    color: "#333",
  },
  privacyBox: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 10,
  height: 150, // controla a altura da área
  marginBottom: 10,
  backgroundColor: "#f9f9f9",
},
privacyText: {
  fontSize: 12,
  color: "#444",
  lineHeight: 18,
},
});
