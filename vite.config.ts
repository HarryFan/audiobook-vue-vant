import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
  server: {
    proxy: {
      '/api/librivox': {
        target: 'https://librivox.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/librivox/, '/api')
      }
    }
  }
})
