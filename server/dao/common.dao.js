var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql_common = require('./common.sql');

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


  /**
   * 获取跟用户挂钩的网站
   */
  getMasterSites: function (req, res, next) {
    console.log('call common dao method: getMasterSites..............');
    pool.getConnection(function (err, connection) {
      connection.query($sql_common.querySites, function (err, result) {
        console.log('heere is result data ....................................');
        jsonWrite(res, result);
        connection.release();
      });
    });
  }

};