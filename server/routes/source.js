// system require
var express = require('express')
var router = express.Router()
var Promise = require('bluebird')

// system require
var sourceDao = require('../dao/source.dao')

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({code:'1', msg:'操作失败'})
  } else {
    res.json(ret)
  }
}

/**
 * 
 * 获取（来源类型）数据接口
 * 
 * query 参数:
 *  siteID
 *  startDate
 *  endDate
 * 
 * 返回值:
 *  pie
 *  line
 *  treegrid
 *  
 */
router.get('/all', function(req, res, next){
  Promise
    .all([
      sourceDao.queryPie(req, res, next),
      sourceDao.queryLine(req, res, next),
      sourceDao.queryTreegrid(req, res, next)
    ])
    .then(function(data) {
      jsonWrite(res, {
        pieData: data[0],
        lineData: data[1],
        tgData: data[2]
      })
    }, function(err) {
      jsonWrite(res, err)
    })
})




module.exports = router