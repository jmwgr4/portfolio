import { defineConfig } from 'vite';

export default defineConfig({
  // Explicitly include dependencies to resolve the pre-bundling warning
  // and improve cold start performance for your Three.js project.
  optimizeDeps: {
    include: ['three', 'gsap', 'lil-gui'],
  },
  server: {
    port: 5173, // Default Vite port
  },
});