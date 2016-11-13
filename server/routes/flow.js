var express = require('express');
var router = express.Router();

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
  var testData = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 40, name: '直接访问' },
          { value: 30, name: '搜索' },
          { value: 30, name: '外链' },

        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };


  res.json(testData);
});
module.exports = router;