import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "tsconfig.lib.json",
      // Add these options to improve compatibility
      logLevel: "warn",
    }),
  ],
  build: {
    minify: true,
    sourcemap: true,
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "StackPage",
      fileName: (format) => `stackpage.${format}.js`,
      formats: ["es", "umd"],
    },
    outDir: path.resolve(__dirname, "dist/lib"),
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "gridstack",
        "lodash",
        "react-router-dom",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          gridstack: "GridStack",
          lodash: "_",
          "react-router-dom": "ReactRouterDOM",
        },
        // Ensure proper module handling
        interop: "auto",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Add this to handle commonjs dependencies
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
