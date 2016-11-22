var statistic = {
	pie:'select GetOrigin(v.referrer) as visitType,count(*) as num from sila_log_visit v group by GetOrigin(v.referrer)'
};

module.exports = statistic;