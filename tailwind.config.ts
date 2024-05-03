import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin');

export const colors = {
  "primary": {
    "light": "#14c973",
    "dark": "#119e5b",
  },
  "secondary": {
    "light": "#A1AF9F",
    "dark": "#7D8A7B",
  },
  "accent": "#ffb000",
  "background": {
    "50": "#ffffff",
    '100': '#F3F4F6',
    '200': '#E5E7EB',
    '300': '#D1D5DB',
    '400': '#9CA3AF',
  },
  "light": "#f5f5f5",
  "dark": "#3E4A3C",
  "path": {
    "light": "#EBCE9A",
    "dark": "#EBCE9A",
  },
  "grass": {
    "light": "#076639",
    "dark": "#054A29",
  },
  "sky": {
    "light": "#a7dcfb",
    "medium": "#9ADAFF",
    "dark": "#4abdff",
  },
} as const;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      custom1: ["SuperBubble", "sans-serif"],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace']
    },
    extend: {
      colors: colors,
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        '5px': '5px', 
      },
      fontFamily: {
        'cookbook': 'Cookbook'
      },
      boxShadow: {
        'custom': '0 3px 0 0px, 0 6px 0 0px',
      }
    },
  },
  plugins: [
  ],
};
export default config;
