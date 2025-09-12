export const COLORS = {
  background: "#ffffff",
  mutedBg: "#eef1f4",
  text: "#111827",
  textMuted: "#6b7280",
  brandYellow: "#fdcb18",
  brandOrange: "#f6990b",
  primary: "#f6990b",
  primaryText: "#ffffff",
  border: "#cfd5db",
  dark: "#111827",
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const SPACING = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const TYPO = {
  title: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#f29f05", // tom próximo do mock
    textAlign: "center" as const,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center" as const,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600" as const,
  },
  button: {
    fontSize: 16,
    color: COLORS.primaryText,
    fontWeight: "700" as const,
    textAlign: "center" as const,
  },
};
