import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "node:url";
import tsconfigPaths from 'vite-tsconfig-paths'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      lodash: "lodash-es",
    },
  },
  optimizeDeps: {
    include: ["lodash-es"],
  },
  server: {
    proxy: {
      "^/(api|login|users/me|refresh)": {
        target: "https://localhost:5229", // ASP.NET Core HTTPS port
        secure: false, // dev self-signed
        changeOrigin: true,
      },
    },
    port: 5173,
    https: {},
  },
})
