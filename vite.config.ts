import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// natalia-KM.github.io is a GitHub *user* site, served from the domain root,
// so the base path stays "/".
export default defineConfig({
  base: "/",
  plugins: [react()],
});
