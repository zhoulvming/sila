var express = require('express');
var router = express.Router();

var visterLogDao = require('../dao/log-visit.dao');
var eventDao = require('../dao/event.dao');

router.get('/setData', function(req, res, next){

  console.log('request query data -------- :');
  console.log(req.query);

  res.json(req.query);
});

// 页面事件log记录
router.get('/buttonClick', function(req, res, next){
  eventDao.addButtonClickData(req, res, next);
});

// 页面访问log记录
router.get('/visterLog', function(req, res, next) {
  console.log('you have accessed visterLog !');
	visterLogDao.addLog(req, res, next);
});

// 页面停留时间？
router.get('/updateStayTime', function(req, res, next) {
  console.log('you have accessed updateStayTime !');
	visterLogDao.updateLeaveTime(req, res, next);
});

module.exports = router;