import { defineConfig } from 'vitest/config'
import path from 'path'
export default defineConfig({
    plugins: [], // 让 Vitest 解析 `tsconfig.json` 里的 `paths`
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // 确保 `@` 指向 `src`
        },
    },
    test: {
        globals: true,
    },
})