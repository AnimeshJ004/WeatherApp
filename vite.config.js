import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tell Vite where your project's root is (where index.html lives)
  root: 'frontend',
  server: {
    proxy: {
      '/weather': 'http://localhost:5000'
    }
  },
  build: {
    // Tell Vite where to output the build folder
    // '../dist' means "go one folder up from 'root', and create 'dist'"
    outDir: '../dist'
  }
})
