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
	getPieData: function (req, res, next) {
		//console.log(req.query.startDate);
		//console.log(req.query.endDate);
		var startDate=req.query.startDate;
		var endDate=req.query.endDate;
		pool.getConnection(function(err, connection) {
			connection.query($sql.pie,[startDate,endDate], function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	getListData1: function (req, res, next) {
		var startDate=req.query.startDate;
		var endDate=req.query.endDate;
		pool.getConnection(function(err, connection) {
			connection.query($sql.list1,[startDate,endDate,startDate,endDate,startDate,endDate],  function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	getListData2: function (req, res, next) {
		var startDate=req.query.startDate;
		var endDate=req.query.endDate;
		pool.getConnection(function(err, connection) {
			connection.query($sql.list2, [startDate,endDate,startDate,endDate,startDate,endDate], function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	getListData3: function (req, res, next) {
		var startDate=req.query.startDate;
		var endDate=req.query.endDate;
		pool.getConnection(function(err, connection) {
			connection.query($sql.list3, [startDate,endDate,startDate,endDate,startDate,endDate], function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	getUvNum:function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.getUvNum, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},

};