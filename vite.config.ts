import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3500',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist/demo'
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
    postcss: './postcss.config.js'
  }
})