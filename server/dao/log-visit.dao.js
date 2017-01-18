var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./log-visit.sql');

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
	addLog: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
			console.log(param);

			// 建立连接，向表中插入值
			connection.query($sql.insert, [
        param.account,
        param.url,
        param.title, 
        param.domain,
        param.referrer,
        param.window_screen,
        param.lang,
        param.cid,
        param.cname,
        param.cip,
				param.uuid
      ], function(err, result) {
				
				console.log('新增错误信息：')
				console.log(err);

				console.log('新增记录的主键ID为：')
				console.log(result.insertId);

				if(result) {
					result = {
						code: 200,
						msg: '增加成功',
						insertId: result.insertId
					};    
				}

				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);

				// 释放连接 
				connection.release();
			});
		});
	},
	updateLeaveTime: function(req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.query || req.params;
			var date_start = new Date( param.strStart );
			var date_leave = new Date( param.lastDate );
			connection.query($sql.updateLeaveTime, [
				date_start,
				date_leave,
				param.id
      ], function(err, result) {

				console.log(err);
				console.log(result);

				if(result) {
					result = {
						code: 200,
						msg:'更新成功'
					};    
				}

				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);

				// 释放连接 
				connection.release();
			});
		});
	}
};