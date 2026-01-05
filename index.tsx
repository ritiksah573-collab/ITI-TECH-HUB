

// Process polyfill for browser compatibility
if (typeof window !== 'undefined') {
  // Fix: Cast window to any to avoid TypeScript error about missing 'process' property
  (window as any).process = (window as any).process || { env: {} };
}

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);