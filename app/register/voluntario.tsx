import { useEffect } from "react";
import { router } from "expo-router";

export default function RegisterVoluntario() {
  useEffect(() => {
    router.replace("/login");
  }, []);
  return null;
}
