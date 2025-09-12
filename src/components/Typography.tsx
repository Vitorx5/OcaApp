import React from "react";
import { Text, TextProps } from "react-native";
import { TYPO, SPACING } from "../theme";

export const Title = (props: TextProps) => (
  <Text {...props} style={[TYPO.title, { marginTop: SPACING.lg }, props.style]} />
);

export const Subtitle = (props: TextProps) => (
  <Text {...props} style={[TYPO.subtitle, { marginTop: SPACING.xs }, props.style]} />
);
