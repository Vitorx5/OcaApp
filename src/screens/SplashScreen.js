import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 4000); // duração do vídeo
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/splash.mp4")}
        style={styles.video}
        resizeMode="cover"
        shouldPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  video: { flex: 1 },
});
