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
        rewrite: (path) => {
          // 確保請求轉發到正確的 API 端點
          const params = path.includes('?') ? path.split('?')[1] : ''
          return `/api/books/json?${params}`
        },
        secure: false
      }
    }
  }
})
