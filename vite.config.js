import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Add your host here
    allowedHosts: ['devserver-main--feedbacka.netlify.app']
  }
})
