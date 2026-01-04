
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Fix: Property 'cwd' does not exist on type 'Process'. Casting to any to access the Node.js process.cwd() method.
  const env = loadEnv(mode, (process as any).cwd(), '');
  const apiKey = env.API_KEY || env.VITE_API_KEY || "";
  
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      'global': 'window',
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    server: {
      port: 5173,
      host: true
    }
  };
});
