// system require
var mysql = require('mysql')
var Promise = require('bluebird')

// private require
var $conf = require('../conf/db')
var $sql = require('./source.sql')

// 使用连接池，提升性能
var pool = mysql.createPool({
	host: $conf.mysql.host,
	user: $conf.mysql.user,
	password: $conf.mysql.password,
	database: $conf.mysql.database,
	port: $conf.mysql.port
})

// 接口函数
module.exports = {

	/**
	 * 获取来源类型中饼图数据
	 */
	queryPie: function (req, res, next) {
		return new Promise(function (resolve, reject) {
			var startDate = req.query.startDate
			var endDate = req.query.endDate
			var siteId = req.query.siteId
			pool.getConnection(function (err, connection) {
				connection.query($sql.pie1, [startDate, endDate, siteId], function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
					connection.release()
				})
			})
		})
	},

	/**
	 * 获取来源类型中趋势图数据
	 */
	queryLine: function (req, res, next) {
		return new Promise(function (resolve, reject) {
			var startDate = req.query.startDate
			var endDate = req.query.endDate
			var siteId = req.query.siteId
			pool.getConnection(function (err, connection) {
				connection.query($sql.pie1, [startDate, endDate, siteId], function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
					connection.release()
				})
			})
		})
	},

	/**
	 * 获取来源类型中树表结构数据
	 */
	queryTreegrid: function (req, res, next) {
		return new Promise(function (resolve, reject) {
			var startDate = req.query.startDate
			var endDate = req.query.endDate
			var siteId = req.query.siteId
			pool.getConnection(function (err, connection) {
				connection.query($sql.pie1, [startDate, endDate, siteId], function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
					connection.release()
				})
			})
		})
	}	

}