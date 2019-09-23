const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

// 获取日期json
function getDate() {
  const file = path.resolve(__dirname, "../data");
  const dir = fs.readdirSync(file);
  console.log(dir);
  const dateList = dir.filter(fs => fs !== '.DS_Store')
    .map(item => {
      const text = moment(item.split('.')).format('YYYY-MM-DD')
      return ({ text, key: item })
    })
  return dateList;
}

// 获取物品json
function getGoods(date) {
  const file = path.resolve(__dirname, `../data/${date}`);
  const dir = fs.readdirSync(file);
  const goodList = dir.map(item => ({ text: item.split('.')[0], key: item }));

  return goodList;
}

// 获取文件json
function getFile(date, fileName) {
  const file = path.resolve(__dirname, `../data/${date}/${fileName}`);
  const data = xlsx.readFile(file);
  const worksheet = data.Sheets.Sheet1;
  const json = xlsx.utils.sheet_to_json(worksheet);
  return json;
}


// 构建数据json文件
function build() {
  const allData = [];
  const dateList = getDate();
  const goodsList = dateList.forEach(item => {
    const dateKey = item.key;
    const dateTxt = item.text;
    getGoods(dateKey).forEach(good => {
      const goodKey = good.key;
      const goodTxt = good.text;
      if (goodKey) {
        getFile(dateKey, goodKey).forEach(data => {
          allData.push({
            title: data['商品标题'],
            img: data['图片URL'],
            discount: data['折扣价'],
            sourcePrice: data['原价'],
            address: data['地址'],
            sales: data['销量'],
            url: data['商品链接'],
            goodsType: goodTxt,
            date: dateTxt
          })
        });
      }
    });
  });

  const savePath = path.resolve(__dirname, `../data/data.json`);
  fs.writeFile(savePath, JSON.stringify(allData), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("数据写入成功！");
  });
}

// 获取json数据
const getData = () => {
  return new Promise((resolve, reject) => {
    const dir = path.resolve(__dirname, "../data/");
    fs.readFile(`${dir}/data.json`, (err, data) => {
      if (err) { reject() }
      else {
        resolve(data);
      }
    })
  })
}


module.exports = {
  getDate,
  getGoods,
  getFile,
  getData,
  build
}