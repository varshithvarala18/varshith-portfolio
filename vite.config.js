import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js lives in a lazily loaded chunk (~900 kB minified, ~240 kB gzipped)
    // that is only requested when a 3D scene approaches the viewport.
    chunkSizeWarningLimit: 1000,
  },
});
