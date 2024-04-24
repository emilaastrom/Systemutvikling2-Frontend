import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin');

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
    },
    extend: {
      colors: {
        'mantis': {
          '50': '#f6faf3',
          '100': '#e9f5e3',
          '200': '#d3eac8',
          '300': '#afd89d',
          '400': '#82bd69',
          '500': '#61a146',
          '600': '#4c8435',
          '700': '#3d692c',
          '800': '#345427',
          '900': '#2b4522',
          '950': '#13250e',
        },
      },
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
        'custom': '0 3px 0 0px rgb(107 114 128), 0 6px 0 0px rgb(107 114 128)',
      }
    },
  },
  plugins: [
  ],
};
export default config;
