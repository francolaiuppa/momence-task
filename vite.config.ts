import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
      },
    }),
  ],
  test: {
    globals: true, // Enables global variables like `describe`, `it`, etc.
    environment: 'jsdom', // Simulates a DOM-like environment for React components
    setupFiles: './vitest.setup.ts', // Add this if you have global setup needs
    css: true, // Enables CSS support in tests
  },
})
