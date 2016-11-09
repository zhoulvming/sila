var express = require('express');
var router = express.Router();

router.get('/getListData_hour', function(req, res, next){
  //允许所有域名访问
  res.setHeader("Access-Control-Allow-Origin", "*");

  var testData = [{
    id: 'test',
    time_split: '01:00',
    access_counts: '100',
    access_scale: '200',
    access_page_counts: '300' 
  },{
    id: 'test',
    time_split: '01:00',
    access_counts: '100',
    access_scale: '200',
    access_page_counts: '300'
  }]


  res.json(testData);
});

module.exports = router;