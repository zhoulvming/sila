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
	getASDataOuterLink: function (req, res, next) {
		var startDate=req.query.startDate;
		var endDate=req.query.endDate;
		var siteId=req.query.siteId;
		pool.getConnection(function(err, connection) {
			
			connection.query($sql.flowsql,[startDate,endDate,siteId,startDate,endDate,siteId,startDate,endDate,siteId,
siteId,startDate,endDate,siteId,startDate,endDate,startDate,endDate,siteId,startDate,endDate,siteId,startDate,endDate,siteId,
siteId,startDate,endDate,siteId,startDate,endDate,startDate,endDate,siteId,startDate,endDate,siteId,startDate,endDate,siteId,
siteId,startDate,endDate
], function(err, result) {
				var data={"total":result.length+1,"rows":[],"footer":[{"source_type":"当前汇总:","pv":8000,"pv_ratio": 100,"visit_count": 600,"uv": 600,"uv_new": 600,"visit_average_time":"00:01:30"}]};
				//data.total=result.length;
				

				var sumPvTotal=0;
				var sumVisitTotal=0;
				var sumUvTotal=0;
				var sumNewUvTotal=0;
				for(var i=0;i<result.length;i++){
					var row = result[i];
					
					sumPvTotal=sumPvTotal+row.pv_num;
					sumVisitTotal=sumVisitTotal+row.visit_num;
					sumUvTotal=sumUvTotal+row.uv_num;
					sumNewUvTotal=sumNewUvTotal+row.new_uv_num;
				}
				
				data.footer[0].pv=sumPvTotal;
				data.footer[0].pv_ratio="";
				data.footer[0].visit_count=sumVisitTotal;
				data.footer[0].uv=sumUvTotal
				data.footer[0].uv_new=sumNewUvTotal
				data.footer[0].visit_average_time="";

				
				for(var i=0;i<result.length;i++){
					var row = result[i];
					var newRow={};

  					
					newRow.source_type=row.ref;
					newRow.pv=row.pv_num;
					newRow.pv_ratio="";
					newRow.visit_count=row.visit_num;
					newRow.uv=row.uv_num;
					newRow.uv_new=row.new_uv_num;
					newRow.visit_average_time=row.avg_time;

					newRow.id=i;
					// 拼接函数(索引位置, 要删除元素的数量, 元素)
					data.rows.splice(newRow.id, 0, newRow); // 
					if(row.type=="搜索引擎"){
					}else if(row.type=="外部链接"){
					}else{
						newRow.source_type="直接访问";
					}
				
				}

				jsonWrite(res, data);
				connection.release();
			});
		});
	},
	getASData: function (req, res, next) {
		//console.log(req.query.startDate);
		//console.log(req.query.endDate);
		var startDate=req.query.startDate;
		var endDate=req.query.endDate;
		var siteId=req.query.siteId;
		pool.getConnection(function(err, connection) {
			connection.query($sql.flowsql,[startDate,endDate,siteId,startDate,endDate,siteId,startDate,endDate,siteId,
siteId,startDate,endDate,siteId,startDate,endDate,startDate,endDate,siteId,startDate,endDate,siteId,startDate,endDate,siteId,
siteId,startDate,endDate,siteId,startDate,endDate,startDate,endDate,siteId,startDate,endDate,siteId,startDate,endDate,siteId,
siteId,startDate,endDate
], function(err, result) {
				var data={"total":result.length+3,"rows":[{"id":1,"source_type":"搜索引擎","pv": 0,"pv_ratio": 0,"visit_count": 0,"uv": 0,"uv_new": 0,"visit_average_time":"00:01:30","_parentId":null,"iconCls":"icon-ok"},{"id":1,"source_type":"外部链接","pv": 0,"pv_ratio": 0,"visit_count": 0,"uv": 0,"uv_new": 0,"visit_average_time":"00:01:30","_parentId":null,"iconCls":"icon-ok"}],"footer":[{"source_type":"当前汇总:","pv":8000,"pv_ratio": 100,"visit_count": 600,"uv": 600,"uv_new": 600,"visit_average_time":"00:01:30"}]};
				//data.total=result.length;
				var seCount=0;
				var sumPvSE=0;
				var sumVisitSE=0;
				var sumUvSE=0;
				var sumNewUvSE=0;

				var sumPvOuter=0;
				var sumVisitOuter=0;
				var sumUvOuter=0;
				var sumNewUvOuter=0;

				var sumPvTotal=0;
				var sumVisitTotal=0;
				var sumUvTotal=0;
				var sumNewUvTotal=0;
				for(var i=0;i<result.length;i++){
					var row = result[i];
					if(row.type=="搜索引擎"){
						sumPvSE=sumPvSE+row.pv_num;
						sumVisitSE=sumVisitSE+row.visit_num;
						sumUvSE=sumUvSE+row.uv_num;
						sumNewUvSE=sumNewUvSE+row.new_uv_num;
					}else if(row.type=="外部链接"){
						sumPvOuter=sumPvOuter+row.pv_num;
						sumVisitOuter=sumVisitOuter+row.visit_num;
						sumUvOuter=sumUvOuter+row.uv_num;
						sumNewUvOuter=sumNewUvOuter+row.new_uv_num;
					}
					sumPvTotal=sumPvTotal+row.pv_num;
					sumVisitTotal=sumVisitTotal+row.visit_num;
					sumUvTotal=sumUvTotal+row.uv_num;
					sumNewUvTotal=sumNewUvTotal+row.new_uv_num;
				}
				data.rows[0].pv=sumPvSE;
				data.rows[0].pv_ratio="";
				data.rows[0].visit_count=sumVisitSE;
				data.rows[0].uv=sumUvSE;
				data.rows[0].uv_new=sumNewUvSE;
				data.rows[0].visit_average_time="";

				data.rows[1].pv=sumPvOuter;
				data.rows[1].pv_ratio="";
				data.rows[1].visit_count=sumVisitOuter;
				data.rows[1].uv=sumUvOuter;
				data.rows[1].uv_new=sumNewUvOuter;
				data.rows[1].visit_average_time="";

				data.footer[0].pv=sumPvTotal;
				data.footer[0].pv_ratio="";
				data.footer[0].visit_count=sumVisitTotal;
				data.footer[0].uv=sumUvTotal
				data.footer[0].uv_new=sumNewUvTotal
				data.footer[0].visit_average_time="";

				
				for(var i=0;i<result.length;i++){
					var row = result[i];
					var newRow={};

  					
					newRow.source_type=row.ref;
					newRow.pv=row.pv_num;
					newRow.pv_ratio="";
					newRow.visit_count=row.visit_num;
					newRow.uv=row.uv_num;
					newRow.uv_new=row.new_uv_num;
					newRow.visit_average_time=row.avg_time;
					if(row.type=="搜索引擎"){
						seCount++;
						newRow.id=2+i;
						newRow._parentId=1;
						newRow.pv_ratio=((row.pv_num/sumPvSE)*100).toFixed(2)+"%";
						// 拼接函数(索引位置, 要删除元素的数量, 元素)
						data.rows.splice(newRow.id-1, 0, newRow); // 

					}else if(row.type=="外部链接"){
						newRow.id=3+i;
						newRow._parentId=seCount+2;
						newRow.pv_ratio=((row.pv_num/sumPvOuter)*100).toFixed(2)+"%";
						data.rows.splice(newRow.id-1, 0, newRow); // 
					}else{
						newRow.source_type="直接访问";
						newRow.id=4+i;
						newRow.iconCls="icon-ok";
						data.rows.splice(newRow.id-1, 0, newRow); // 
					}
				
				}

				jsonWrite(res, data);
				connection.release();
			});
		});
	},
	getPieData: function (req, res, next) {
		//console.log(req.query.startDate);
		//console.log(req.query.endDate);
		//console.log(req.query.siteId);
		var startDate=req.query.startDate;
		var endDate=req.query.endDate;
		var siteId=req.query.siteId;
		pool.getConnection(function(err, connection) {
			connection.query($sql.pie,[startDate,endDate,siteId], function(err, result) {
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