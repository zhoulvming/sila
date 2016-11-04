var express = require('express');
var router = express.Router();

// var mysql   = require('mysql');
// var connection = mysql.createConnection({
//  host   : 'localhost',
//  user   : 'root',
//  password : '',
//  database : 'sila'
// });
 

router.get('/sila', function(req, res, next){
  console.log('almost here......');
  // paramters
  var siteKey = req.params.siteKey;

  // // insert data
  // connection.connect();
  // connection.query('insert into test (name ,degree) values ("lupeng" , 20)');
  // connection.end();

  res.render('index.html');
});

router.get('/sila/getData', function(){
  // select data
  // connection.connect();
  // connection.query('select name ,degree from test', function(err, rows, fields) {
  //   if (err) throw err;
  //   if (rows) {
  //     for (var i = 0; i < rows.length; i++) {
  //       console.log("%s\t%d", rows[i].name, rows[i].degree);
  //     }
  //   }
  // });
  // connection.end();
});


module.exports = router;