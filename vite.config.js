import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tell Vite where your project's root is (where index.html lives)
  root: 'frontend',
  server: {
    proxy: {
      // In local dev: /api/weather → Express backend at localhost:5000
      '/api': 'http://localhost:5000'
    }
  },
  build: {
    // Output to root-level dist/ (Vercel reads from here via vercel.json outputDirectory)
    outDir: '../dist',
    emptyOutDir: true,
  }
})
