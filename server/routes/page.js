var express = require('express');
var router = express.Router();

var echartdatatemplate = require('./echartDataTemplate');

router.get('/getLineData', function (req, res, next) {
  var option = echartdatatemplate.getLineOptionTemplate();
  //console.log('here----------------');
  /*
  option.series[0].name = "流量来源饼图";
  option.series[0].data[0] = {};
  option.series[0].data[0].value = 3;
  option.series[0].data[0].name = '直接访问';
  option.series[0].data[1] = {};
  option.series[0].data[1].value = 4;
  option.series[0].data[1].name = '搜索引擎';
  option.series[0].data[2] = {};
  option.series[0].data[2].value = 7;
  option.series[0].data[2].name = '外部链接';
  */
  res.json(option);
});

module.exports = router;