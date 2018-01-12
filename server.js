const Koa = require('koa');
const app = new Koa();
const { uploadFile } = require('./upload')
const path = require('path')
const koaBody = require('koa-body');
const fs = require('fs')

// response
// app.use(ctx => {
// 	let url = ctx.request.url
// 	console.log(url)
//   ctx.body = 'Hello Koa';
// });

app.use(koaBody({ multipart: true }));
app.use(async function (ctx, next) {
  if ('POST' != ctx.method) return await next();
  // console.log(ctx.request.body) //base 64了
  let base64Data = ctx.request.body
  var dataBuffer = new Buffer(base64Data, 'base64');
  fs.writeFile("image.png", dataBuffer, function (err) {
    if (err) {
      console.log('失败', err)
    } else {
      console.log('成功')
    }
  });
  ctx.body = "success";
});

// app.use( async ( ctx ) => {
//   if ( ctx.url === '/' && ctx.method === 'GET' ) {
//     // 当GET请求时候返回表单页面
//     let html = `
//       <h1>koa2 upload demo</h1>
//       <form method="POST" action="/upload.json" enctype="multipart/form-data">
//         <p>file upload</p>
//         <span>picName:</span><input name="picName" type="text" /><br/>
//         <input name="file" type="file" /><br/><br/>
//         <button type="submit">submit</button>
//       </form>
//     `
//     ctx.body = html

//   } else if ( ctx.url === '/upload.json' && ctx.method === 'POST' ) {
//     // 上传文件请求处理
//     let result = { success: false }
//     let serverFilePath = path.join( __dirname, 'upload-files' )

//     console.log(ctx.request.body.files.file)
//     // 上传文件事件
//     // result = await uploadFile( ctx, {
//     //   fileType: 'album', // common or album
//     //   path: serverFilePath
//     // })

//     ctx.body = result
//   } else {
//     // 其他请求显示404
//     ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
//   }
// })

app.listen(3002, () => {
  console.log('[demo] jsonp is starting at port 3002')
})