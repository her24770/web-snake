import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiPath   = env.VITE_API_URL    || '/api'
  const apiTarget = env.VITE_API_TARGET || ''

  return {
    plugins: [react()],
    server: {
      proxy: apiTarget ? {
        [apiPath]: {
          target: apiTarget,
          changeOrigin: true,
        },
      } : {},
    },
  }
})
