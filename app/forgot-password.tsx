import { useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from "react-native";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const API_BASE = (() => {
  // PRODUÇÃO
  const PROD = "https://api.oca.dev"; // <-- troque pelo seu domínio de prod

  // DEV
  const DEV_DEVICE = "http://192.168.0.15:8000"; // <-- troque pelo IP:PORTA da sua máquina na LAN
  const DEV_ANDROID_EMULATOR = "http://10.0.2.2:8000"; // Laravel/Apache rodando no host

  if (!__DEV__) return PROD;
  // emulador Android detecta como device? aqui simplificamos:
  return Platform.OS === "android" ? DEV_ANDROID_EMULATOR : DEV_DEVICE;
})();

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  const emailValid = useMemo(() => EMAIL_RE.test(email.trim()), [email]);

  async function submit() {
    const e = email.trim();
    if (!emailValid) {
      Alert.alert("E-mail inválido", "Digite um e-mail válido.");
      return;
    }
    if (!API_BASE) {
      Alert.alert("Configuração ausente", "Defina EXPO_PUBLIC_API_BASE_URL no .env");
      return;
    }

    setSending(true);
    setServerMsg(null);

    try {
      const res = await fetch(`https://ocaunida.com.br/api/password/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: e }),
      });

      const text = await res.text();
      let json: any = undefined;
      try { json = text ? JSON.parse(text) : undefined; } catch {}

      if (res.ok) {
        setSent(true);
        setServerMsg(json?.message || "Enviamos um e-mail com o link para redefinir sua senha.");
      } else if (res.status === 404) {
        setServerMsg(json?.message || "Email inexistente na base de clientes.");
      } else if (res.status === 429) {
        setServerMsg("Muitas tentativas. Aguarde um minuto e tente novamente.");
      } else {
        setServerMsg(json?.message || `Falha ao enviar e-mail (código ${res.status}).`);
      }
    } catch (err: any) {
      setServerMsg("Falha de rede. Verifique sua conexão.");
    } finally {
      setSending(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f4f6f8" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 20, maxWidth: 520, alignSelf: "center", width: "100%" }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 6 }}>Esqueci minha senha</Text>
          <Text style={{ color: "#5f6368", marginBottom: 16 }}>
            Informe seu e-mail para enviarmos o link de redefinição. O link expira em 10 minutos.
          </Text>

          <Text style={{ color: "#6b7280", marginBottom: 6 }}>E-mail</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="voce@exemplo.com"
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              borderColor: email.length === 0 ? "#dcdfe4" : (emailValid ? "#10b981" : "#f97316"),
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 12,
              fontSize: 16,
              backgroundColor: "#fff",
              marginBottom: 14,
            }}
          />

          {serverMsg ? (
            <Text style={{ marginBottom: 12, color: sent ? "#1b5e20" : "#b91c1c" }}>
              {serverMsg}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={submit}
            disabled={!emailValid || sending}
            style={{
              backgroundColor: (!emailValid || sending) ? "#fbbf24" : "#f6990b",
              opacity: (!emailValid || sending) ? 0.8 : 1,
              paddingVertical: 12,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            {sending ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
                {sent ? "Reenviar e-mail" : "Enviar link de redefinição"}
              </Text>
            )}
          </TouchableOpacity>

          {sent ? (
            <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 10 }}>
              Se não encontrar o e-mail, verifique sua caixa de spam.
            </Text>
          ) : null}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
