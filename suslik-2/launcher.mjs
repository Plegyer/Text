/** Start SUSLIK 2 on its fixed local URL and ask Windows Explorer to open the default browser. */
import { createServer, get } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
const root = resolve(dirname(fileURLToPath(import.meta.url)));
const port = 41873; // fixed browser origin: saves survive archive updates and shortcut setup
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.gif':'image/gif','.mp3':'audio/mpeg'};
const server = createServer(async (req, res) => {
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') {res.writeHead(405); res.end(); return;}
    const url = new URL(req.url, 'http://127.0.0.1');
    if (url.pathname === '/__suslik2_health') {
      res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8','X-Suslik2-App':'true','Cache-Control':'no-store'});
      res.end('SUSLIK 2');
      return;
    }
    const name = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const file = resolve(root, '.' + name);
    if (!file.startsWith(root + sep)) throw new Error('invalid location');
    const body = await readFile(file);
    res.writeHead(200, {'Content-Type':types[extname(file)] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (_) { res.writeHead(404); res.end('Not found'); }
});
const url = `http://127.0.0.1:${port}/`;
function openBrowser() {
  console.log(`SUSLIK 2: ${url}`);
  if (process.platform !== 'win32') {
    console.log('Open the address above in your browser.');
    return;
  }
  // Passing a ready-made "start" command through Node's cmd.exe argument escaping
  // did not work on some Windows installations. Explorer uses the registered HTTP
  // protocol handler instead, so the system's default browser opens the URL.
  const child = spawn('explorer.exe', [url], {windowsHide: true, stdio: 'ignore'});
  child.on('error', error => {
    console.error('Automatic browser launch failed:', error.message);
    console.error(`Open this address manually: ${url}`);
  });
  child.unref();
}
server.on('error', error => {
  if (error.code !== 'EADDRINUSE') {
    console.error('SUSLIK 2 server error:', error.message);
    process.exitCode = 1;
    return;
  }
  // If already running, do not start a second server or change the save origin.
  const check = get(`http://127.0.0.1:${port}/__suslik2_health`, res => {
    const isOurs = res.statusCode === 200 && res.headers['x-suslik2-app'] === 'true';
    res.resume();
    if (isOurs) openBrowser();
    else {
      console.error(`Port ${port} belongs to another application. Close it before starting SUSLIK 2.`);
      process.exitCode = 1;
    }
  });
  check.setTimeout(2000, () => check.destroy(new Error('Timeout')));
  check.on('error', () => {
    console.error(`Port ${port} is occupied. Close the other application first.`);
    process.exitCode = 1;
  });
});
server.listen(port, '127.0.0.1', () => {
  console.log('SUSLIK 2 server started.');
  openBrowser();
  console.log('To stop the game server, close this window.');
});
