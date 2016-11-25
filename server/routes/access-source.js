var express = require('express');
var router = express.Router();
var asdao = require('../dao/accessSourceDao');
var echartdatatemplate = require('./echartDataTemplate');

router.get('/getListData_hour', function (req, res, next) {
  //允许所有域名访问
  res.setHeader("Access-Control-Allow-Origin", "*");

  var testData = [{
    id: 'test',
    time_split: '01:00',
    access_counts: '100',
    access_scale: '200',
    access_page_counts: '300'
  }, {
    id: 'test',
    time_split: '01:00',
    access_counts: '100',
    access_scale: '200',
    access_page_counts: '300'
  }]


  res.json(testData);
});

router.get('/getPieData', function (req, res, next) {
  asdao.getPieData(req, res, next); 
});

//搜索引擎   
router.get('/getListData1', function (req, res, next) {
  asdao.getListData1(req, res, next); 
});

//外部链接    
router.get('/getListData2', function (req, res, next) {
  asdao.getListData2(req, res, next); 
});

//直接访问
router.get('/getListData3', function (req, res, next) {
  asdao.getListData3(req, res, next); 
});



router.get('/getBarData1', function (req, res, next) {
  asdao.getUvNum(req, res, next); 
});


router.get('/getTop10ListData', function (req, res, next) {
  var testData = [{
    keyword: '关键字a',
    uv: '23',
    pv: '54',
    browsePageNum: '4',
    avgStayTime: '5',
    newVisitor: '6',
    tcl: '23%'
  }, {
    keyword: '关键字b',
    uv: '43',
    pv: '74',
    browsePageNum: '4',
    avgStayTime: '5',
    newVisitor: '6',
    tcl: '43%'
  }]


  res.json(testData);
});
module.exports = router;