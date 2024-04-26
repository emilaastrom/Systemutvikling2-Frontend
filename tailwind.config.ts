import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin');

export const colors = {
  "primary": {
    "light": "#3dda4c",
    "dark": "#23ad2a",
  },
  "secondary": {
    "light": "#A1AF9F",
    "dark": "#7D8A7B",
  },
  "accent": "#ffb000",
  "background": "#ffffff",
  "dark": "#3E4A3C",
  "path": {
    "light": "#F2DC9B",
    "dark": "#F2B66D",
  },
  "grass": {
    "light": "#a3f07d",
    "dark": "#8CD867",
  },
  "sky": {
    "light": "#62cff4",
    "dark": "#2c67f2",
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
