import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
        include: [
            'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
            '../../packages/shared/src/**/*.{test,spec}.{js,ts,jsx,tsx}',
        ],
    },
    resolve: {
        alias: {
            '@bandeira/shared': path.resolve(__dirname, '../../packages/shared/src/index.ts'),
            '@bandeira/database': path.resolve(__dirname, '../../packages/database/src/index.ts'),
            '@core': path.resolve(__dirname, 'src/core'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@test': path.resolve(__dirname, 'src/test'),
        },
    },
})
