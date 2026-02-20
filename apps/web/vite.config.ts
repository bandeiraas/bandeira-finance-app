import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  envDir: path.resolve(__dirname, '../..'),
  resolve: {
    alias: {
      '@bandeira/shared': path.resolve(__dirname, '../../packages/shared/src/index.ts'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
})
