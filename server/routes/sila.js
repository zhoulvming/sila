var express = require('express');
var router = express.Router();

var visterLogDao = require('../dao/visterLogDao');
 

router.get('/setData', function(req, res, next){

  console.log('request query data -------- :');
  console.log(req.query);

  res.json(req.query);
});

router.get('/buttonClick', function(req, res, next){
  console.log('button click data =========: ');
  console.log(req.query);



  res.json(req.query);

});


router.get('/visterLog', function(req, res, next) {
	//visterLogDao.addLog(req, res, next);
  console.log(req.query);
});




module.exports = router;