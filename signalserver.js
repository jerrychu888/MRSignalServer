const Joi = require('joi');  //return a class
const express = require('express');
const app = express();
var fs = require('fs');
require('dotenv').config();

app.use(express.json());

const port = process.env["PORT"] || 7777;
const filePath = process.env["filePath"] || "C:/windu/";

//Init
app.get('/',(req, res) => {
  res.send('Listening new signal');
});

app.listen(port, () => {
  console.log('Start listening...at '+port);
});

//Listening signal
/*
{
	"symbol":"YM",
	"strategyId":"windu01",
	"orderLots":-1,
	"maxLots":4,
	"orderDateTime":"2019-12-20 22:56:12"
}
*/
app.post('/windu/signals', async (req, res) => {

  let schema = {
    symbol:Joi.string().min(1).required(),// 長度至少1字
    strategyId:Joi.string().min(1).required(),// 長度至少1字
    orderLots: Joi.number().required(), // 數字＋必填
    maxLots: Joi.number().required(), // 數字＋必填
    orderDateTime: Joi.string() // 字串
  };
  let result = Joi.validate(req.body, schema);
  /* return an object that has two properties: error and value.
  Only one of them can exist.*/
  //console.log(result);
  //這裡輸出result，就會知道當error時該輸出哪些錯誤訊息給用戶端
  if (result.error) {
    res.status(400).send(result.error.details[0].message); 
    //把error物件中適當的property輸出，提供了反映用戶API錯誤的訊息
    // status code 400 Means bad request
    return ;
  }

  const responseMsg = await writeSignal(req.body)
  console.log(responseMsg);
  res.send(responseMsg);
});

//商品,策略名稱,最大口數,0,0,1,0,0,0,0,0,目前倉位,0,0,0,0,0,0
async function writeSignal(signal) {
  const symbol = signal.symbol;
  const source = signal.strategyId;
  const maxLots = signal.maxLots;
  const fileName = symbol+'.txt';
  const orderLots = signal.orderLots;
  var signalContent = `@${symbol},${source},${maxLots},0,0,1,0,0,0,0,0,${orderLots},0,0,0,0,0,0`;

  if (!fs.existsSync(filePath)){
    fs.mkdirSync(filePath);
  }

  await fs.writeFile(filePath+fileName, signalContent , function (err) {
    if (err)
        return err;    
  });
  return `Write signal ${fileName} complete at ${new Date().toISOString()}`;
}


/* 
app.get('/windu/history/:year/:month/:date',(req, res) => {
  signal = {};
  res.send(req.params);
  var myquery ="";
  if(req.params.date || "" != "")
    const myquery=req.params.year+"-"+req.params.month+"-"+req.params.date;
  else if(req.params.month || "" != "")
    const myquery=req.params.year+"-"+req.params.month;
  else if(req.params.year || "" != "")
    const myquery=req.params.year;
  
  // let signal = signal.find(signal => signal.orderDateTime >= myquery);
  // if (!signal) {
  //   res.status(404).send('The signal with the given Date was not found');
  // return ;
  // }
  // res.send(signal);
});
*/