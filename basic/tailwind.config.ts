import { Config } from "tailwindcss";
import { resolveProjectPath } from "wasp/dev";

const config: Config = {
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

export default config;
