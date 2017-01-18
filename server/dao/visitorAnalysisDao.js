var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./statisticSql');

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

module.exports = {
    getVisitorIpMap: function (req, res, next) {
        var startDate = req.query.startDate;
        var endDate = req.query.endDate;
        var siteId = req.query.siteId;
        console.log('startDate='+startDate);
        console.log('endDate='+endDate);
        console.log('siteId='+siteId);
        pool.getConnection(function (err, connection) {
            connection.query($sql.visitorIpSql, [siteId,startDate, endDate], function (err, result) {
                jsonWrite(res, result);
                console.log('++++++++++++++++++'+result.length);
                connection.release();
            });
        });
          
    }
};