// CRUD SQL语句
var source = {

  source_type_pie: `
    SELECT
      CASE
        when referrer_type=0 then '搜索引擎'
        when referrer_type=1 then '外部链接'
        when referrer_type=2 then '直接访问'
      END AS name,
      count(*) AS value
    FROM 
      sila_log_visit 
    WHERE 
      idsite=? AND start_time BETWEEN ? AND ?
    GROUP BY  referrer_type
  `,

  source_type_line_day: `
    SELECT *
    FROM stat_hour_pv t 
    WHERE t.calcu_date = STR_TO_DATE(?,'%Y-%m-%d') 
    AND t.site_id = ?
    ORDER BY t.type_id
    `,

  source_type_tg_day: `
    
  `

}

module.exports = source