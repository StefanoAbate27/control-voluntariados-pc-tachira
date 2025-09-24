import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Necesario para que index.html y JS carguen desde .asar
  build: {
    outDir: '../electron/dist', // ✅ Exporta a donde Electron lo necesita
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
