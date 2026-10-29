import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ["node_modules"],
        quietDeps: true,
        silenceDeprecations: ["import"],
      },
    },
  },
  plugins: [
    laravel({
      input: ["resources/js/app.jsx"],
      refresh: true,
    }),
    react({ compiler: true }),
  ],
});
