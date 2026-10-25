/**
 * నేటి భారతం (Neti Bharatam) — Production Server Entry Point
 * Used for Hostinger VPS, Cloud, Docker, and full-stack deployment.
 * Usage:
 *   npm install
 *   npm run build
 *   node server.js
 */
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  }).listen(port, hostname, () => {
    console.log(`> నేటి భారతం (Neti Bharatam) ready on http://${hostname}:${port}`);
  });
});
