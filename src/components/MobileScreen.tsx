// src/components/MobileScreen.tsx
import React from "react";
import { Platform, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  contentContainerStyle?: any;
  scroll?: boolean; // se quiser desativar scroll em telas curtas
  keyboardOffset?: number; // opcional para ajustar header custom
};

export default function MobileScreen({ children, contentContainerStyle, scroll = true }: Props) {
  const insets = useSafeAreaInsets();

  const Container = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS usa padding; Android costuma ir bem com height
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : insets.top} // ajuste fino se tiver header
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container
            // IMPORTANTE: faz o conteúdo crescer/rolar quando o teclado aparece
            contentContainerStyle={[
              { flexGrow: 1, paddingHorizontal: 16, paddingBottom: insets.bottom + 16 },
              contentContainerStyle,
            ]}
            // garante que toques em inputs dentro do ScrollView funcionem mesmo com teclado aberto
            keyboardShouldPersistTaps="handled"
            // @ts-ignore: só existe em ScrollView; se for View, ignora
            showsVerticalScrollIndicator={false}
          >
            {children}
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
