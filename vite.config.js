import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify'; // Import the Vuetify plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // Enable Vuetify auto-import
  ],
  server: {
    port: 8000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
