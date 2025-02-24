import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Garante que os caminhos de build funcionem no Vercel
  build: {
    outDir: 'dist' // Certifique-se de que o diretório de build esteja configurado como 'dist'
  }
});
