CREATE TABLE `sila_site` (
  `idsite` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL,
  `main_url` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idsite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='站点表'

CREATE TABLE `sila_log_visit` (
  `idvisit` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idsite` int(10) unsigned NOT NULL,
  `idvisitor` binary(8) NULL,
  `visit_last_action_time` datetime NULL,
  `visit_first_action_time` datetime NULL,
  `visit_total_time` smallint(5) unsigned NULL,
  PRIMARY KEY (`idvisit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='页面访问表'  

  