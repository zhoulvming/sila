var express = require('express');
var router = express.Router();
var vadao = require('../dao/visitorAnalysisDao');

router.get('/getVisitorIpMap', function (req, res, next) {
  vadao.getVisitorIpMap(req, res, next); 
});


module.exports = router;