var express = require('express');
var router = express.Router();
var pgdao = require('../dao/pageInfoDao');
//var echartdatatemplate = require('./echartDataTemplate');

router.get('/getLineData', function (req, res, next) {
  pgdao.getLineData(req, res, next); 
  
});

module.exports = router;