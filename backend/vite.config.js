import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Reads GROQ_API_KEY from backend/.env for local testing only
  const env = loadEnv(mode, process.cwd(), '');
  process.env.GROQ_API_KEY ||= env.GROQ_API_KEY;

  return {
    optimizeDeps: { include: ['three', 'gsap', 'lil-gui'] },
    server: { port: 5173 },
    plugins: [{
      // Runs api/chat.js (the Vercel function) inside the dev server
      name: 'local-api',
      configureServer(server) {
        server.middlewares.use('/api/chat', async (req, res) => {
          let raw = '';
          for await (const chunk of req) raw += chunk;
          try { req.body = JSON.parse(raw || '{}'); } catch { req.body = {}; }
          res.status = (code) => { res.statusCode = code; return res; };
          res.json = (obj) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); };
          const { default: handler } = await server.ssrLoadModule('/api/chat.js');
          await handler(req, res);
        });
      },
    }],
  };
});
