import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Proyecto_aguacates/', // importante para GitHub Pages
  plugins: [react()]
})
