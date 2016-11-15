CREATE TABLE sila_site (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(90) NOT NULL,
  main_url varchar(255) NOT NULL,
  created timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='站点表'

CREATE TABLE sila_log_visit (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='页面访问表'  

  