// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: {
      preset: 'vercel',
    }
  },
  vite: {
    plugins: [
      {
        name: 'api-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && (req.url.startsWith('/api/admin') || req.url.startsWith('/api/login'))) {
              try {
                // Use ssrLoadModule to load the ES module backend
                const { default: app } = await server.ssrLoadModule('./api/admin.js');
                // Express apps can be used as middleware
                return app(req, res, next);
              } catch (err) {
                console.error('API Error:', err);
                next(err);
              }
            }
            next();
          });
        }
      }
    ]
  }
});
