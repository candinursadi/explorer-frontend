import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
    plugins: [vue()],
        server: {
            port: 5173,
            proxy: {
            // Optional: during local dev, proxy API calls to your backend
            '/api': {
                target: process.env.VITE_API_PROXY || 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
});