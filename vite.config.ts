import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
// Set SINGLEFILE=1 to inline everything into one self-contained index.html.
export default defineConfig({
  // Relative base so the hash-router SPA works whether served from a domain root
  // or a GitHub Pages project subpath (user.github.io/<repo>/).
  base: './',
  plugins: [react(), ...(process.env.SINGLEFILE ? [viteSingleFile()] : [])],
  server: { allowedHosts: true },
})
