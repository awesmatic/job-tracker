import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config. The React plugin lets Vite understand JSX/TSX.
export default defineConfig({
  plugins: [react()],
});
