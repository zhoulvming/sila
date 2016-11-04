var express = require('express');
var router = express.Router();

router.get('/sila', function(req, res, next){

  console.log('almost here......');

  // paramters
  var siteKey = req.params.siteKey;

  res.render('index.html');
});

module.exports = router;