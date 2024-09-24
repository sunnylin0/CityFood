import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'
const __dirname = path.resolve();

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.js'],
    },
    resolve: {
        alias: [
            { find: '~', replacement: path.resolve(__dirname, '.') },
            { find: '@', replacement: path.resolve(__dirname, 'src') },
        ]
    },
});

