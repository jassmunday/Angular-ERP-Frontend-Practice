import { defineConfig } from 'vite';
import angular from '@vitejs/plugin-angular';

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: {
      // Add your path aliases here if necessary
    },
  },
  server: {
    port: 4200, // Default port for Angular projects
  },
});
