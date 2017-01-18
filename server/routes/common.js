var express = require('express');
var router = express.Router();
var commonDao = require('../dao/common.dao');


/**
 * 获取跟用户相关的监控网站列表数据
 */
router.get('/sites', function(req, res, next){
  commonDao.getMasterSites(req, res, next);
});


// 页面访问log记录
router.get('/visterLog', function(req, res, next) {
  commonDao.log('you have accessed visterLog !');
	visterLogDao.addLog(req, res, next);
});


module.exports = router;