var statistic = {
	//流量来源--概览--饼图
	pie:'select GetOrigin(v.referrer) as visitType,count(*) as num from sila_log_visit v group by GetOrigin(v.referrer)',
	
	//流量来源--概览--饼图右边的列表  当中的pv
	list1:'select t.referrer,count(*) as num from sila_log_visit t where GetOrigin(t.referrer)=\'搜索引擎\'group by t.referrer order by t.referrer'

};

module.exports = statistic;