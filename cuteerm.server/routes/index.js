var express = require('express');
var router = express.Router();
var helloA=require('./hellow')(),
helloB=require('./hellow')();
var helloC=(new require('./hellow')()),
helloD=(new require('./hellow')());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/hello',function(req,res,next){
  helloA.greetings='B';
  helloC.greetings='C';
  console.log(helloA.greetings);
  console.log(helloB.greetings);
  console.log(helloC.greetings);
  console.log(helloD.greetings);
  
  res.render('a');
});
module.exports = router;
