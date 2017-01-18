// CRUD SQL语句
var source = {

  source_type_pie: `
    SELECT
    GetOrigin (t.referrer) AS name,
    count(*) AS value
  FROM
    sila_log_visit t where t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
    and t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day)
    and t.idsite = ?
  GROUP BY
    GetOrigin (t.referrer)
    `,

  source_type_line: `
    SELECT
    GetOrigin (t.referrer) AS name,
    count(*) AS value
  FROM
    sila_log_visit t where t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
    and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day)
  GROUP BY
    GetOrigin (t.referrer)
    `,

  source_type_tg: `
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
  `


}

module.exports = source