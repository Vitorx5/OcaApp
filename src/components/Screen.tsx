import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SPACING } from "../theme";

type Props = ViewProps & { children: React.ReactNode };

export default function Screen({ style, children, ...rest }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={[styles.container, style]} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
});
