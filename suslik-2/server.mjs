import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)));
const contentTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.mjs': 'text/javascript; charset=utf-8' };
const host = '127.0.0.1';
const port = Number(process.env.PORT || 4173);
createServer(async (request, response) => {
  try {
    if (request.method !== 'GET') { response.writeHead(405); response.end(); return; }
    const pathname = new URL(request.url, 'http://' + host + ':' + port).pathname;
    const relative = decodeURIComponent(pathname === '/' ? '/index.html' : pathname);
    const file = resolve(root, '.' + relative);
    if (!file.startsWith(root + sep)) throw new Error('Bad path');
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': contentTypes[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(body);
  } catch (_) { response.writeHead(404); response.end('Not found'); }
}).listen(port, host, () => console.log('SUSLIK 2: http://' + host + ':' + port + '/'));
