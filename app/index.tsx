// app/splash.tsx (ou app/index.tsx, se for sua primeira tela)
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { router } from "expo-router";

export default function Splash() {
  // Cria o player a partir do asset local
  const player = useVideoPlayer(require("../assets/video/splash.mp4"), (p) => {
    p.loop = true;      // loop
    p.muted = true;     // sem áudio para não incomodar
    p.play();           // autoplay
  });

  useEffect(() => {
    const t = setTimeout(() => router.replace("/login"), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        // Dica: ajuste o fit visual do vídeo (cover/contain/scale-down)
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  video: { flex: 1, width: "100%" },
});
