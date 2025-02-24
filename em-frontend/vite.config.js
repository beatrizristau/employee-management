import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // change port number from 5171 to 3000
  server: {
    port: 3000,
  }
})
