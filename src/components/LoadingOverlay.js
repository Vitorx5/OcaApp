import React from "react";
import { View, Image, StyleSheet, Modal } from "react-native";

export default function LoadingOverlay({ visible }) {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.container}>
        <Image source={require("../../assets/loading.gif")} style={styles.gif} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: 120,
    height: 120,
  },
});
