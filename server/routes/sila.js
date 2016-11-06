var express = require('express');
var router = express.Router();

// var mysql   = require('mysql');
// var connection = mysql.createConnection({
//  host   : 'localhost',
//  user   : 'root',
//  password : '',
//  database : 'sila'
// });
 

router.get('/setData', function(req, res, next){

  console.log('request query data:');
  console.log(req.query);

  // var clientIP = req.headers['x-forwarded-for'] ||
  //   req.connection.remoteAddress ||
  //   req.socket.remoteAddress ||
  //   req.connection.socket.remoteAddress;

  console.log(getClientIp(req));

  // // insert data
  // connection.connect();
  // connection.query('insert into test (name ,degree) values ("lupeng" , 20)');
  // connection.end();

  res.json(req.query);
});

router.get('/getData', function(){
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


var getClientIp = function(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for'); 
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};


module.exports = router;