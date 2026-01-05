

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Fix: Cast process to any to bypass TypeScript check for 'cwd' method availability
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY || ""),
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false
    }
  };
});