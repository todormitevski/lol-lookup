import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      "@": path.resolve(root, "."),
      // "@assets": path.resolve(root, "assets"),
      // "@components": path.resolve(root, "components"),
      // "@pages": path.resolve(root, "pages"),
      // "@routes": path.resolve(root, "routes"),
      // "@hooks": path.resolve(root, "hooks"),
      // "@types": path.resolve(root, "types"),
    },
  },
});
