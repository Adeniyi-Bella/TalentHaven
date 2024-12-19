import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer";


export default defineConfig({
  plugins: [
    react(),
  ],
  assetsInclude: [ "**/*.gltf", "**/*.bin", "**/*.ifc"],

  server: {
    port: 4400,
  },
})