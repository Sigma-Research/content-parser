// const Koa = require('koa');
import Koa from 'koa';
import { parse } from "@unified-latex/unified-latex-util-parse";

const app = new Koa();

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
    const t = parse('f(\\delta)=\\frac{1}{\\sqrt{2 \\pi} \\sigma} \\cdot \\mathrm{e}^{-\\frac{\\delta^2}{2 t^2}}');
    ctx.body = t;
});

app.listen(3000);