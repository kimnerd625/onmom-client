import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          main_600: "#FF7B00",
          main_500: "#FF6411",
          main_400: "#FF8D21",
          main_300: "#FFA652",
          main_200: "#FFB76B",
          main_100: "#FFCD90",
        },
        album: {
          main_500: "#FFC13D",
        },
        system: {
          error: "#E02929",
          safety: "#5CBAFF",
          check: "#D4E2FF",
          modal: "#F2F2F2",
          bg: "#FFFFFF",
        },
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
      },
    },
  },
};
export default config;
