import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { router } from "expo-router";

export default function Splash() {
  useEffect(() => {
    const t = setTimeout(() => router.replace("/login"), 3500);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/video/splash.mp4")}
        style={styles.video}
        resizeMode="cover"
        shouldPlay
      />
    </View>
  );
}
const styles = StyleSheet.create({ container:{flex:1}, video:{flex:1} });
