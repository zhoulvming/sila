// CRUD SQL语句
var source = {

  pie1: `
    SELECT
    GetOrigin (t.referrer) AS visitType,
    count(*) AS num
  FROM
    sila_log_visit t where t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
    and t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day)
    and t.idsite = ?
  GROUP BY
    GetOrigin (t.referrer)
    `,


  pie2: `
    SELECT
    GetOrigin (t.referrer) AS visitType,
    count(*) AS num
  FROM
    sila_log_visit t where t.start_time > STR_TO_DATE(?,'%Y-%m-%d') 
    and  t.start_time < DATE_add(STR_TO_DATE(?,'%Y-%m-%d'),INTERVAL 1 day)
  GROUP BY
    GetOrigin (t.referrer)
    `


};

module.exports = source;