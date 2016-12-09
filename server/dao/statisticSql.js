

var statistic = {
	//流量相关统计数据 
	/*匹配的参数
	[startDate,endDate,siteId,startDate,endDate,siteId,startDate,endDate,siteId,
siteId,startDate,endDate,siteId,startDate,endDate,startDate,endDate,siteId,startDate,endDate,siteId,startDate,endDate,siteId,
siteId,startDate,endDate,siteId,startDate,endDate,startDate,endDate,siteId,startDate,endDate,siteId,startDate,endDate,siteId,
siteId,startDate,endDate
]*/
	flowsql:`
SELECT '搜索引擎' as type, pv.ref,pv.pv_num,uv.uv_num, GetVisitNum(?,?,?,pv.ref)as visit_num, 
GetNewUvNum(?,?,?,pv.ref)as new_uv_num,
GetAvgPageTime (?,?,?,pv.ref) as avg_time from
(select t.referrer as ref ,count(*) as pv_num from sila_log_visit t where GetOrigin(t.referrer)='搜索引擎'
and t.idsite=?
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day) group by t.referrer ) 
pv left join 
(select se.ref,count(*) as uv_num from
(select distinct (t.referrer) as ref, t.cookie_uuid as uv_num from sila_log_visit t where GetOrigin(t.referrer)='搜索引擎'
  and t.idsite=?
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day))
 se group by se.ref) uv
on pv.ref=uv.ref
union all
SELECT '外部链接' as type, pv.ref,pv.pv_num,uv.uv_num, GetVisitNum(?,?,?,pv.ref)as visit_num, 
GetNewUvNum(?,?,?,pv.ref)as new_uv_num,
GetAvgPageTime (?,?,?,pv.ref)  as avg_time from
(select t.referrer as ref ,count(*) as pv_num from sila_log_visit t where GetOrigin(t.referrer)='外部链接'
and t.idsite=?
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day) group by t.referrer ) 
pv left join 
(select se.ref,count(*) as uv_num from
(select distinct (t.referrer) as ref, t.cookie_uuid as uv_num from sila_log_visit t where GetOrigin(t.referrer)='外部链接'
  and t.idsite=?
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day))
 se group by se.ref) uv
on pv.ref=uv.ref
union all

select '直接访问' as type, t.referrer as ref ,count(*) as pv_num,COUNT( DISTINCT t.cookie_uuid) as uv_num,
GetVisitNum(?,?,?,'')as visit_num,
GetNewUvNum(?,?,?,'')as new_uv_num,
GetAvgPageTime (?,?,?,'')  as avg_time
 from sila_log_visit t where t.referrer ='' 
and t.idsite=?
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day)


	`,

	//流量来源--概览--饼图
	pie: `
	SELECT
	GetOrigin (t.referrer) AS visitType,
	count(*) AS num
FROM
	sila_log_visit t where t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day)
GROUP BY
	GetOrigin (t.referrer)
	`,

	//流量来源--概览--饼图右边的列表  搜索引擎的pv,uv，跳出数
	list1: `
	SELECT pv.ref,pv.pv_num,uv.uv_num,tc.tc_num from
(select t.referrer as ref ,count(*) as pv_num from sila_log_visit t where GetOrigin(t.referrer)='搜索引擎'
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day) group by t.referrer ) 
pv left join 
(select se.ref,count(*) as uv_num from
(select distinct (t.referrer) as ref, t.cookie_uuid as uv_num from sila_log_visit t where GetOrigin(t.referrer)='搜索引擎'
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day))
 se group by se.ref) uv
on pv.ref=uv.ref
left join
(select s.ref,sum(isonepage(s.cookie_uuid)) as tc_num from
(select distinct (t.referrer) as ref, t.cookie_uuid from sila_log_visit t where GetOrigin(t.referrer)='搜索引擎' 
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day)) s group by s.ref) tc 
	on pv.ref=tc.ref

	`,

	//流量来源--概览--饼图右边的列表  外部链接的pv,uv，跳出数
	list2: `
	SELECT pv.ref,pv.pv_num,uv.uv_num,tc.tc_num from
(select t.referrer as ref ,count(*) as pv_num from sila_log_visit t where GetOrigin(t.referrer)='外部链接' 
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day) group by t.referrer ) 
pv left join 
(select se.ref,count(*) as uv_num from
(select distinct (t.referrer) as ref, t.cookie_uuid as uv_num from sila_log_visit t where GetOrigin(t.referrer)='外部链接' 
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day))
 se group by se.ref) uv
on pv.ref=uv.ref
left join
(select s.ref,sum(isonepage(s.cookie_uuid)) as tc_num from
(select distinct (t.referrer) as ref, t.cookie_uuid from sila_log_visit t where GetOrigin(t.referrer)='外部链接' 
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day)) s group by s.ref) tc 
	on pv.ref=tc.ref
	`,

	//流量来源--概览--饼图右边的列表  直接访问的pv,uv，跳出数
	list3: `
	SELECT pv.ref,pv.pv_num,uv.uv_num,tc.tc_num from
(select t.referrer as ref ,count(*) as pv_num from sila_log_visit t where GetOrigin(t.referrer)='直接访问' 
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day) group by t.referrer ) 
pv left join 
(select se.ref,count(*) as uv_num from
(select distinct (t.referrer) as ref, t.cookie_uuid as uv_num from sila_log_visit t where GetOrigin(t.referrer)='直接访问' 
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day))
 se group by se.ref) uv
on pv.ref=uv.ref
left join
(select s.ref,sum(isonepage(s.cookie_uuid)) as tc_num from
(select distinct (t.referrer) as ref, t.cookie_uuid from sila_log_visit t where GetOrigin(t.referrer)='直接访问' 
and t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day)) s group by s.ref) tc 
	on pv.ref=tc.ref
	`,

	//获取最近10天的uv数量
	getUvNum:`
	SELECT  DATE_FORMAT((DATE_sub(now(),INTERVAL 9 day)), '%Y-%m-%d') as date,
        getUvNum(DATE_FORMAT((DATE_sub(now(),INTERVAL 9 day)), '%Y-%m-%d')) as num
	UNION ALL
	SELECT  DATE_FORMAT((DATE_sub(now(),INTERVAL 8 day)), '%Y-%m-%d') as date,
        getUvNum(DATE_FORMAT((DATE_sub(now(),INTERVAL 8 day)), '%Y-%m-%d')) as num
	UNION ALL
	SELECT  DATE_FORMAT((DATE_sub(now(),INTERVAL 7 day)), '%Y-%m-%d') as date,
        getUvNum(DATE_FORMAT((DATE_sub(now(),INTERVAL 7 day)), '%Y-%m-%d')) as num
	UNION ALL
	SELECT  DATE_FORMAT((DATE_sub(now(),INTERVAL 6 day)), '%Y-%m-%d') as date,
        getUvNum(DATE_FORMAT((DATE_sub(now(),INTERVAL 6 day)), '%Y-%m-%d')) as num
	UNION ALL
	SELECT  DATE_FORMAT((DATE_sub(now(),INTERVAL 5 day)), '%Y-%m-%d') as date,
        getUvNum(DATE_FORMAT((DATE_sub(now(),INTERVAL 5 day)), '%Y-%m-%d')) as num
	UNION ALL
	SELECT  DATE_FORMAT((DATE_sub(now(),INTERVAL 4 day)), '%Y-%m-%d') as date,
        getUvNum(DATE_FORMAT((DATE_sub(now(),INTERVAL 4 day)), '%Y-%m-%d')) as num
	UNION ALL
	SELECT  DATE_FORMAT((DATE_sub(now(),INTERVAL 3 day)), '%Y-%m-%d') as date,
        getUvNum(DATE_FORMAT((DATE_sub(now(),INTERVAL 3 day)), '%Y-%m-%d')) as num
	UNION ALL
	SELECT  DATE_FORMAT((DATE_sub(now(),INTERVAL 2 day)), '%Y-%m-%d') as date,
        getUvNum(DATE_FORMAT((DATE_sub(now(),INTERVAL 2 day)), '%Y-%m-%d')) as num
	UNION ALL
	SELECT  DATE_FORMAT((DATE_sub(now(),INTERVAL 1 day)), '%Y-%m-%d') as date,
        getUvNum(DATE_FORMAT((DATE_sub(now(),INTERVAL 1 day)), '%Y-%m-%d')) as num
	UNION ALL
	SELECT  DATE_FORMAT((DATE_sub(now(),INTERVAL 0 day)), '%Y-%m-%d') as date,
        getUvNum(DATE_FORMAT((DATE_sub(now(),INTERVAL 0 day)), '%Y-%m-%d')) as num
	
	`,

	//网页数据--概览 折线图
	pvUvLine:`
	select DATE_FORMAT(t.start_time, '%Y-%m-%d') as date,count(*) as pv_num, COUNT(DISTINCT t.cookie_uuid) as uv_num 
		from sila_log_visit t where t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
	and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day)
		group by DATE_FORMAT(t.start_time, '%Y-%m-%d')
	`



};

module.exports = statistic;