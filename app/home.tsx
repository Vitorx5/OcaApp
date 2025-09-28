// import React from "react";
// import { View, StyleSheet } from "react-native";
// import Screen from "../src/components/Screen";
// import AppButton from "../src/components/AppButton";
// import { COLORS, SPACING } from "../src/theme";
// import { router } from "expo-router";
// import { Image } from "expo-image"; // <- aqui

// export default function Home() {
//   return (
//     <Screen>
//       <View style={s.wrap}>

//       </View>
//     </Screen>
//   );
// }

// const s = StyleSheet.create({
//   wrap: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: SPACING.xl,
//   },
//   gif: { width: 90, height: 90, marginBottom: SPACING.xxl },
// });

// Exemplo: Home.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../src/components/Screen";
import { SPACING } from "../src/theme";

export default function Home() {
  return (
    <Screen>
      <View style={s.wrap}>
        {/* Conteúdo da tela */}
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: SPACING.xl,
    paddingBottom: 80, // espaço para a navbar
  },
});
