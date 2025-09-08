import { IHeadlineSettings } from "@/types/style.type";

export const FONT_FAMILIES = [
  { value: "font-sans", label: "Geist Sans" },
  { value: "font-serif", label: "Serif" },
  { value: "font-mono", label: "Geist Mono" },
];
export const FONT_WEIGHTS = [
  { value: "font-light", label: "Light" },
  { value: "font-normal", label: "Normal" },
  { value: "font-medium", label: "Medium" },
  { value: "font-semibold", label: "Semibold" },
  { value: "font-bold", label: "Bold" },
  { value: "font-extrabold", label: "Extra Bold" },
]

export const UNDERLINE_STYLES = [
  { value: "none", label: "None" },
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "wavy", label: "Wavy" },
];


export const DEFAULT_SETTINGS: IHeadlineSettings = {
  text: "Your Amazing Headline",
  fontSize: 48,
  fontFamily: "font-sans",
  fontWeight: "font-bold",
  color: "#1f2937",
  hasGradient: false,
  gradientDirection: "to-r",
  gradientStart: "#6366f1",
  gradientEnd: "#8b5cf6",
  textShadow: false,
  letterSpacing: 0,
  lineHeight: 1.2,
  textStroke: false,
  strokeWidth: 1,
  strokeColor: "#000000",
  hoverGlow: false,
  glowColor: "#6366f1",
  glowIntensity: 10,
  perLetterAnimation: false,
  animationDelay: 0.1,
  backgroundHighlight: false,
  highlightColor: "#fbbf24",
  highlightPadding: 8,
  underlineStyle: "none",
  underlineColor: "#6366f1",
  underlineThickness: 2,
};



export const DEFAULT_TEMPLATES = [
  {
    name: "Modern Gradient",
    settings: {
      text: "Modern Design",
      fontSize: 56,
      fontFamily: "font-sans",
      fontWeight: "font-black",
      hasGradient: true,
      gradientStart: "#6366f1",
      gradientEnd: "#8b5cf6",
      gradientDirection: "to-r",
      textShadow: false,
      hoverGlow: true,
      glowColor: "#6366f1",
      perLetterAnimation: true,
      animationDelay: 0.1,
    },
  },
  {
    name: "Bold Statement",
    settings: {
      text: "Bold Statement",
      fontSize: 64,
      fontFamily: "font-sans",
      fontWeight: "font-black",
      color: "#1f2937",
      textStroke: true,
      strokeWidth: 2,
      strokeColor: "#6366f1",
      textShadow: true,
      backgroundHighlight: true,
      highlightColor: "#fbbf24",
    },
  },
  {
    name: "Elegant Underline",
    settings: {
      text: "Elegant Design",
      fontSize: 48,
      fontFamily: "font-serif",
      fontWeight: "font-light",
      color: "#374151",
      underlineStyle: "solid",
      underlineColor: "#6366f1",
      underlineThickness: 3,
      letterSpacing: 2,
      hoverGlow: true,
      glowColor: "#6366f1",
    },
  },
  {
    name: "Neon Glow",
    settings: {
      text: "Neon Effect",
      fontSize: 52,
      fontFamily: "font-mono",
      fontWeight: "font-bold",
      color: "#10b981",
      textShadow: true,
      hoverGlow: true,
      glowColor: "#10b981",
      glowIntensity: 20,
      perLetterAnimation: true,
      animationDelay: 0.15,
    },
  },
];