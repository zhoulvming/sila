var express = require('express');
var router = express.Router();
var sourceDao = require('../dao/source.dao');

var Promise = require('bluebird');

// 获取饼图（来源类型）数据接口

/**
 * 
 * 获取饼图（来源类型）数据接口
 * 参数：
 *  siteID
 *  startDate
 *  endDate
 * 
 */
router.get('/all', function(req, res, next){

// res.json({
//   user: User.find(req.params.userId),
//   memo: Project.getMemo(req.params.userId)
// });


  // source.query(req, res, next);

  // sourceDao.query(req, res, next).then(function(result){
  //   console.log(111111);
  // });


});


// 页面访问log记录
router.get('/visterLog', function(req, res, next) {
  console.log('you have accessed visterLog !');
	visterLogDao.addLog(req, res, next);
});





module.exports = router;