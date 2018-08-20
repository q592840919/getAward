const superagent = require('superagent'),
cheerio = require('cheerio'),
config = require('./config'),
schedule = require('node-schedule'),      //定时器
now = config.dateFomat(new Date()),
getNetUrl = "http://caipiao.163.com/award/cqssc/",
getMyUrl = `http://120.26.211.107/period/20180806${now}`,
addNumUrl = `http://120.26.211.107/period/20180806${now}`;
let netData = [],
myData = [];

console.log(now);
//获取网易彩票信息
async function getAward(){
  let res = await  superagent.get(getNetUrl),
    $ = cheerio.load(res.text);
    /**
   * res.text 包含未解析前的响应内容
   * 我们通过cheerio的load方法解析整个文档，就是html页面所有内容，可以通过console.log($.html());在控制台查看
   */
    $(".award-winNum").each(function(i,item){
    netData[i] = $(item).html();
    });
}

async function checkAward(){
  let res = await superagent.get(getMyUrl);
  JSON.parse(res.text).periods.forEach(function(item,i){
    myData[i] = item.numbers;
  });
  checkNum(netData,myData);
}

//检测，如果发现有不同的中奖号码，更新
function checkNum(nData,mData){
  nData.forEach(function(item,i){
    if(item!=mData[i]){
      superagent.get(addNumUrl).send({ numbers: item }).end(function (err,res) {
        console.log(res.data);
      });
    }
  })
}

function init (){
  //每分钟的第一秒发生
  schedule.scheduleJob('1 * * * * *', function(){
      console.log('scheduleCronstyle:' + new Date());
      //getAward();
  });
}

init();
