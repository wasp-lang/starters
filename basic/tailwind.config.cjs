import { resolveProjectPath } from "wasp/dev";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [resolveProjectPath("./src/**/*.{js,jsx,ts,tsx}")],
  theme: {
    extend: {
      colors: {
        "wasp-yellow": "#ffcc00",
      },
    },
  },
  plugins: [],
};
