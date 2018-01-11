const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
	let url = ctx.request.url
	console.log(url)
  ctx.body = 'Hello Koa';
});

app.listen(3002);
console.log('listern ...')