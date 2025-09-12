import React from "react";
import { View } from "react-native";

type Props = {
  /** Altura (ou largura, se horizontal) do espaçamento em pixels */
  size?: number;
  /** Se true, aplica espaço na horizontal (largura) em vez de altura */
  horizontal?: boolean;
};

export default function Spacer({ size = 12, horizontal = false }: Props) {
  return horizontal ? <View style={{ width: size }} /> : <View style={{ height: size }} />;
}
