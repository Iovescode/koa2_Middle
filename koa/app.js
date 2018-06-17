const Koa = require('koa');
const path = require('path')
const Router = require('koa-router');
var koa2Req = require('koa2-request');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')


const app = new Koa();
const router = new Router();
app.use(bodyParser());


//静态支援路径
app.use(static(path.join(__dirname, './')))


//跨域
app.use(cors({
    origin: function(ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://127.0.0.1:8020';
        // 这样就能只允许 http:/ / localhost: 8080
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


//node 做中间层处理

router.get('/', async function(ctx, next) {
    // console.log(ctx.query)
    var res = await koa2Req('https://cnodejs.org/api/v1/topics', );
    ctx.body = res.body
})


.get('/getto', async function(ctx, next) {
    var res = await koa2Req('https://avatars2.githubusercontent.com/u/19297519' + ctx.query)
})


.post('/to', async function(ctx, next) {
    // console.log(ctx.request.body)
    var res = await koa2Req('http://www.gohosts.com/index.php?g=common&m=goods&a=get_goods', ctx.request.body);
    // console.log(res)
    ctx.body = res.body
})


.post('/todo', (ctx, next) => {
    //console.log(ctx.request.body)
    ctx.body = "hellow word";
})


//node 读取静态资源
.get('/getHtml', async function(ctx, next) {
    await ctx.render('index')
})



app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000, () => {
    console.log('starting at port 3000');
});