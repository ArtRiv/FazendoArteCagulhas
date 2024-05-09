import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "background": "rgba(var(--background))",
        "foreground": "rgba(var(--foreground))",
      },
      colors: {
        'decoration': "rgba(var(--decoration))",
        'dark': "var(--text-dark)",
        'shapes-dark': "var(--shapes-dark)",
        'shapes-dark-10': "var(--shapes-dark-10)",
        'decoration-pink': "var(--decoration-pink)",
        'decoration-pink-40': "var(--decoration-pink-40)",
        'decoration-pink-60': "var(--decoration-pink-60)",
        'decoration-pink-20': "var(--decoration-pink-20)",
        'decoration-indigo': "var(--decoration-indigo)",
        'decoration-indigo-background-20': "var(--decoration-indigo-background-20)",
        'decoration-indigo-background-10': "var(--decoration-indigo-background-10)",
      },
      fontSize: {
        'smallest': "var(--font-size-smallest)",
        'small': "var(--font-size-small)",
        'normal': "var(--font-size-normal)",
        'big': "var(--font-size-big)",
        'biggest': "var(--font-size-biggest)",
      },
      textColor: {
        'font-color': "rgba(var(--font-color))",
        'font-light': "rgba(var(--text-light))",
        'font-dark': "rgba(var(--text-dark))",
      },
      fill: {
        'icon-color': "rgba(var(--icon-color))",
      },
      stroke: {
        'icon-color': "rgba(var(--icon-color))",
      },
      lineHeight: {
        'line-height-smallest': "var(--font-line-height-smallest)",
        'line-height-small': "var(--font-line-height-small)",
        'line-height-normal': "var(--font-line-height-normal)",
        'line-height-big': "var(--font-line-height-big)",
      },
      letterSpacing: {
        'letter-space-smallest': "var(--font-letter-spacing-smallest)",
        'letter-space-small': "var(--font-letter-spacing-small)",
        'letter-space-normal': "var(--font-letter-spacing-normal)",
        'letter-space-big': "var(--font-letter-spacing-big)",
      },
      fontFamily: {
        'harmonia': "var(--harmonia-sans-font)",
      },
      height: {
        'header-height': "var(--header-height)",
        'icon-height-smallest': "var(--icon-height-smallest)",
        'icon-height-small': "var(--icon-height-small)",
        'icon-height-normal': "var(--icon-height-normal)",
      },
      width: {
        'icon-width-smallest': "var(--icon-width-smallest)",
        'icon-width-small': "var(--icon-width-small)",
        'icon-width-normal': "var(--icon-width-normal)",
      },
      borderRadius: {
        'radius-small': "var(--border-radius-small)",
        'radius-normal': "var(--border-radius-normal)",
        'radius-big': "var(--border-radius-big)"
      }
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;


