export interface ThemePalette {
  name: string
  bgBase: string
  bgSurface: string
  bgSurfaceVariant: string
  bgHover: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  accentPrimary: string
  accentSecondary: string
  accentSuccess: string
  accentWarning: string
  accentDanger: string
  accentInfo: string
}

export const themes: Record<string, ThemePalette> = {
  materialDark: {
    name: "Material Dark",
    bgBase: "#141318",
    bgSurface: "#1e1d24",
    bgSurfaceVariant: "#2b2933",
    bgHover: "#373441",
    textPrimary: "#e6e1e9",
    textSecondary: "#cac4d0",
    textMuted: "#938f99",
    accentPrimary: "#c8bfff",
    accentSecondary: "#d7bafb",
    accentSuccess: "#a6e3a1",
    accentWarning: "#f9e2af",
    accentDanger: "#f38ba8",
    accentInfo: "#89b4fa",
  },
  catppuccinMocha: {
    name: "Catppuccin Mocha",
    bgBase: "#1e1e2e",
    bgSurface: "#181825",
    bgSurfaceVariant: "#313244",
    bgHover: "#45475a",
    textPrimary: "#cdd6f4",
    textSecondary: "#bac2de",
    textMuted: "#a6adc8",
    accentPrimary: "#cba6f7",
    accentSecondary: "#f5c2e7",
    accentSuccess: "#a6e3a1",
    accentWarning: "#f9e2af",
    accentDanger: "#f38ba8",
    accentInfo: "#89b4fa",
  },
  tokyoNight: {
    name: "Tokyo Night",
    bgBase: "#1a1b26",
    bgSurface: "#16161e",
    bgSurfaceVariant: "#24283b",
    bgHover: "#2f354f",
    textPrimary: "#c0caf5",
    textSecondary: "#a9b1d6",
    textMuted: "#787c99",
    accentPrimary: "#7aa2f7",
    accentSecondary: "#bb9af7",
    accentSuccess: "#9ece6a",
    accentWarning: "#e0af68",
    accentDanger: "#f7768e",
    accentInfo: "#7dcfff",
  },
  nord: {
    name: "Nord",
    bgBase: "#2e3440",
    bgSurface: "#242933",
    bgSurfaceVariant: "#3b4252",
    bgHover: "#434c5e",
    textPrimary: "#eceff4",
    textSecondary: "#e5e9f0",
    textMuted: "#d8dee9",
    accentPrimary: "#88c0d0",
    accentSecondary: "#81a1c1",
    accentSuccess: "#a3be8c",
    accentWarning: "#ebcb8b",
    accentDanger: "#bf616a",
    accentInfo: "#5e81ac",
  },
}
