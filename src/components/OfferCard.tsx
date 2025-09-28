// src/components/OfferCard.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { COLORS, SPACING } from "../theme";

type OfferCardProps = {
  avatar: any;
  name: string;
  role: string;
  registration: string;
  description: string;
  date: string;
  time: string;
  status: "ONLINE" | "OFFLINE";
  vacancies?: number;
  onRequest?: () => void;
  onDonate?: () => void;
};

export default function OfferCard({
  avatar,
  name,
  role,
  registration,
  description,
  date,
  time,
  status,
  vacancies,
  onRequest,
  onDonate,
}: OfferCardProps) {
  return (
    <View style={s.card}>
      <View style={s.header}>
        <Image source={avatar} style={s.avatar} contentFit="cover" />
        <View style={{ marginLeft: SPACING.md, flex: 1 }}>
          <Text style={s.name}>{name}</Text>
          <Text style={s.role}>
            {role} - {registration}
          </Text>
        </View>
      </View>

      <Image
        source={require("../../assets/sample-service.jpg")} // troque pela imagem do serviço
        style={s.serviceImage}
        contentFit="cover"
      />

      <View style={s.content}>
        <Text style={s.description}>{description}</Text>
        <Text style={s.date}>
          {date} - {time}
        </Text>
        <View style={s.statusWrap}>
          <Text style={[s.status, { backgroundColor: status === "ONLINE" ? "#4CAF50" : "#CCC" }]}>
            {status}
          </Text>
          {vacancies !== undefined && (
            <Text style={s.vacancies}>+{vacancies} VAGAS</Text>
          )}
        </View>

        <View style={s.buttons}>
          <TouchableOpacity style={[s.btn, { backgroundColor: COLORS.primary }]} onPress={onRequest}>
            <Text style={s.btnText}>Solicitar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.btn, { backgroundColor: "#FFA500" }]} onPress={onDonate}>
            <Text style={s.btnText}>Doar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: SPACING.lg,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  header: { flexDirection: "row", padding: SPACING.md, alignItems: "center" },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  name: { fontWeight: "bold", fontSize: 16 },
  role: { color: "#666", fontSize: 12 },
  serviceImage: { width: "100%", height: 150 },
  content: { padding: SPACING.md },
  description: { marginBottom: SPACING.sm },
  date: { fontSize: 12, color: "#666", marginBottom: SPACING.sm },
  statusWrap: { flexDirection: "row", gap: SPACING.sm, marginBottom: SPACING.md },
  status: {
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  vacancies: { fontSize: 12, color: "#666", paddingHorizontal: SPACING.sm, paddingVertical: 2 },
  buttons: { flexDirection: "row", justifyContent: "space-between" },
  btn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: SPACING.xs,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
