import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    test: {
        globals: true,
    },
    resolve: {
        alias: {
            '@bandeira/shared': path.resolve(__dirname, '../../packages/shared/src/index.ts'),
            '@bandeira/database': path.resolve(__dirname, '../../packages/database/src/index.ts'),
        },
    },
})
