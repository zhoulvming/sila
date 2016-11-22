var event = {
	insert:'INSERT INTO sila_event(idsite, page_url, event_type, event_name, event_time, target_id) VALUES(?,?,?,?,CURRENT_TIMESTAMP,?)'
};

module.exports = event;