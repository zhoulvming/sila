var statistic = {
	//流量来源--概览--饼图
	pie: `
	SELECT
	GetOrigin (v.referrer) AS visitType,
	count(*) AS num
FROM
	sila_log_visit v
GROUP BY
	GetOrigin (v.referrer)
	`,

	//流量来源--概览--饼图右边的列表  搜索引擎的pv,uv
	list1: `
	SELECT pv.ref,pv.pv_num,uv.uv_num from
(select t.referrer as ref ,count(*) as pv_num from sila_log_visit t where GetOrigin(t.referrer)='搜索引擎' group by t.referrer ) 
pv left join 
(select se.ref,count(*) as uv_num from
(select distinct (t.referrer) as ref, t.cookie_uuid as uv_num from sila_log_visit t where GetOrigin(t.referrer)='搜索引擎')
 se group by se.ref) uv
on pv.ref=uv.ref
	`,

	//流量来源--概览--饼图右边的列表  外部链接的pv,uv
	list2: `
	SELECT pv.ref,pv.pv_num,uv.uv_num from
(select t.referrer as ref ,count(*) as pv_num from sila_log_visit t where GetOrigin(t.referrer)='外部链接' group by t.referrer ) 
pv left join 
(select se.ref,count(*) as uv_num from
(select distinct (t.referrer) as ref, t.cookie_uuid as uv_num from sila_log_visit t where GetOrigin(t.referrer)='外部链接')
 se group by se.ref) uv
on pv.ref=uv.ref
	`,

	//流量来源--概览--饼图右边的列表  直接访问的pv,uv
	list3: `
	SELECT pv.ref,pv.pv_num,uv.uv_num from
(select t.referrer as ref ,count(*) as pv_num from sila_log_visit t where GetOrigin(t.referrer)='直接访问' group by t.referrer ) 
pv left join 
(select se.ref,count(*) as uv_num from
(select distinct (t.referrer) as ref, t.cookie_uuid as uv_num from sila_log_visit t where GetOrigin(t.referrer)='直接访问')
 se group by se.ref) uv
on pv.ref=uv.ref
	`



};

module.exports = statistic;