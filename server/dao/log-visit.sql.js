var visterLog = {
	insert:'INSERT INTO sila_log_visit(idsite,page_url,page_title,domain,referrer,window_screen,language,cid,cname,cip,cookie_uuid) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
	updateLeaveTime: 'UPDATE sila_log_visit SET start_time=?,leave_time=? where id=?'
};

module.exports = visterLog;