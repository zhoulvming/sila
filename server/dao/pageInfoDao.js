var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./statisticSql');

// 使用连接池，提升性能
var pool  = mysql.createPool({
  host: $conf.mysql.host,
  user: $conf.mysql.user,
  password: $conf.mysql.password,
  database: $conf.mysql.database,
  port: $conf.mysql.port
});

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	getLineData: function (req, res, next) {
		//console.log(req.query.startDate);
		//console.log(req.query.endDate);
		var startDate=req.query.startDate;
		var endDate=req.query.endDate;
		pool.getConnection(function(err, connection) {
			connection.query($sql.pvUvLine,[startDate,endDate], function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	

};