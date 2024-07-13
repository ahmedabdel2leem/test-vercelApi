// api/[json-server].js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const jsonServer = require('json-server');
const data = require('../db.json');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);

        if (parsedUrl.pathname.startsWith('/api')) {
            server.use(middlewares);
            server.use(router);
            server(req, res);
        } else {
            handle(req, res, parsedUrl);
        }
    }).listen(process.env.PORT || 3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
