import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://gabriguerra.github.io/cwb-houseplants/',  // Substitua "NOME-DO-REPOSITORIO" pelo nome do seu repositório no GitHub
})
