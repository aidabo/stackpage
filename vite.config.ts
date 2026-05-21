import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3500",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist/demo",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/react/") || id.includes("/node_modules/react-dom/") || id.includes("/node_modules/react-router-dom/"))
            return "vendor-react";
          if (id.includes("/node_modules/gridstack/")) return "vendor-gridstack";
          if (id.includes("/node_modules/@rjsf/")) return "vendor-rjsf";
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Add these for better resolution
      "@/demo": path.resolve(__dirname, "src/demo"),
      "@/lib": path.resolve(__dirname, "src/lib"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
