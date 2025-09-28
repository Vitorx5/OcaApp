import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from '@expo/vector-icons';


export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Não mostrar a navbar na tela de login
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/register/voluntario" ||
    pathname === "/register/comum" ||
    pathname === "/reset"
  )
    return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Ionicons name="home-outline" style={styles.link} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/logout")}>
        <Ionicons name="log-out-outline" style={styles.link} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#ffffffff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
  },
  link: {
    color: "#f6990b",
    fontSize: 27,
  },
});
