import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        yoonchildfundDaeHan: ["YoonchildfundDaeHan", "sans-serif"],
        yoonchildfundManSeh: ["YoonchildfundManSeh", "sans-serif"],
        yoonchildfundMinGuk: ["YoonchildfundMinGuk", "sans-serif"],
      },
      colors: {
        brand: {
          main_700: "#FCAE66",
          main_600: "#FF7B00",
          main_500: "#FF6411",
          main_400: "#FF8D21",
          main_300: "#FFA652",
          main_200: "#FFB76B",
          main_100: "#FFCD90",
        },
        album: {
          first: "#FFC13D",
          second: "#FFF0CA",
          third: "#F1F1F1",
        },
        text: {
          main: "#202226",
          sub: "#838383",
        },
        system: {
          error: "#E02929",
          safety: "#5CBAFF",
          check: "#D4E2FF",
          modal: "#F2F2F2",
          bg: "#FFFFFF",
          divider: "#F7F7F7",
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
