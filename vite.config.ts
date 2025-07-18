import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Pour GitHub Pages : remplacer par le nom de votre repo si besoin
  base: '/react-lvl2-quizz-maker/',
})
