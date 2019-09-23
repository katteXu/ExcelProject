const Koa = require("koa");
const Router = require('koa-router');
const Public = require('koa-static');
const cors = require('koa2-cors');
const history = require('koa-connect-history-api-fallback');
const path = require('path');
const { getDate, getFile, getGoods, getData, build } = require('./data');

const server = new Koa();
const router = new Router();
const home = Public(path.resolve(__dirname, "../client/build/"))

server.use(history());
server.use(home);
server.use(cors());

router.post('/date', ctx => {
  ctx.body = getDate();
});

router.post('/goods', ctx => {
  const { date } = ctx.query;
  ctx.body = getGoods(date);
});



router.post('/list', ctx => {
  const { date, good } = ctx.query;
  ctx.body = getFile(date, good);
})
// 获取生成数据
router.post('/getData', async ctx => {
  const data = await getData();

  ctx.body = data;
});

// 生成总数据
router.post('/buildData', ctx => {
  build();
  ctx.body = '完成'
})


server.use(router.routes());
server.listen(3000, () => {
  console.log('ready at http://localhost:3000')
})