import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from "vite-plugin-mkcert";
import tsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert(), tsConfigPaths()],
  server: {
    proxy: {
      "^/(api|users/me|refresh)": {
        target: "https://localhost:5229", // ASP.NET Core HTTPS port
        secure: false, // dev self-signed
        changeOrigin: true,
      },
    },
    port: 5173,
    https: {},
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      lodash: "lodash-es",
    },
  },
  optimizeDeps: {
    include: ["lodash-es"],
  },
})
