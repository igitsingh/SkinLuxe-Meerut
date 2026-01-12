import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#B4838D",
                secondary: "#E6E2DD",
                dark: "#1C1C1C",
                light: "#F9F8F6",
                accent: "#D4AF37",
            },
            fontFamily: {
                serif: ["Cormorant Garamond", "serif"],
            },
        },
    },
    plugins: [],
};

export default config;
