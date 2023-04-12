import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from 'vite-plugin-compression2'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),compression()],
  server: {
    host: "0.0.0.0",
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
