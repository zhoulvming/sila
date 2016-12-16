var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./source.sql');




// 使用连接池，提升性能
var pool = mysql.createPool({
  host: $conf.mysql.host,
  user: $conf.mysql.user,
  password: $conf.mysql.password,
  database: $conf.mysql.database,
  port: $conf.mysql.port
});

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};


// 接口函数
module.exports = {


	query: function (req, res, next) {
		var startDate = req.query.startDate;
		var endDate = req.query.endDate;
    var siteId = req.query.siteId;
		pool.getConnection(function(err, connection) {
			connection.query($sql.pie1, [startDate, endDate, siteId], function (err, result) {
			  jsonWrite(res, result);
			  connection.release();
			});
		});
	},



  // test: return new Promise(function(resolve, reject){
  //   tradiationCallbackBasedThing(function(error, data){
  //     if (error) {
  //         reject(error);
  //     } else {
  //         resolve(data)
  //     }
  //   });
  // }),





	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}

};