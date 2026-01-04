
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

export default defineConfig(({ mode }) => {
  // Use process.cwd() to obtain the current directory for Vite environment variable loading.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY || ""),
      'global': {},
      'process.env': {
        API_KEY: env.API_KEY || env.VITE_API_KEY || ""
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
