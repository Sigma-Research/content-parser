import Koa from 'koa';
import Router from 'koa-router';
import body from 'koa-body';

import { parse } from "@unified-latex/unified-latex-util-parse";

const app = new Koa();
const router = new Router();

app.use(body({
    jsonLimit: '3kb',
}));

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

router.get('/', async (ctx, next) => {
    ctx.response.body = 'hello content-parser';
});

router.post('/api/latex-parser', async (ctx, next) => {
    const { latex } = ctx.request.body;
    ctx.response.body = parse(latex);
});

app.use(router.routes());

app.listen(3000);