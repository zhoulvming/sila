CREATE TABLE sila_site (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(90) NOT NULL,
  main_url varchar(255) NOT NULL,
  created timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='站点表'

CREATE TABLE sila_log_visit (
  uuid varchar(50) NOT NULL ,
  idsite int(10) unsigned,
  page_url varchar(255),
  page_title varchar(255),
  domain varchar(90),
  referrer varchar(255),
  window_screen varchar(20),
  language varchar(20),
  cid varchar(10),
  cname varchar(50),
  cip varchar(20),
  start_time timestamp NULL DEFAULT NULL,
  leave_time timestamp NULL DEFAULT NULL,
  PRIMARY KEY (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='页面访问量表'  

CREATE TABLE sila_event (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  idsite int(10) unsigned,
  page_url varchar(255),
  event_type int(2) unsigned,
  event_name varchar(50),
  event_time timestamp,
  target_id varchar(50),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='事件统计表'