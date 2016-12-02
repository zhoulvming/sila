/*
Navicat MySQL Data Transfer

Source Server         : local--
Source Server Version : 50624
Source Host           : 127.0.0.1:3306
Source Database       : digtal

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-12-03 06:31:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for search_engine
-- ----------------------------
DROP TABLE IF EXISTS `search_engine`;
CREATE TABLE `search_engine` (
  `domain` varchar(100) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sila_log_visit
-- ----------------------------
DROP TABLE IF EXISTS `sila_log_visit`;
CREATE TABLE `sila_log_visit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idsite` int(10) unsigned DEFAULT NULL,
  `page_url` varchar(255) DEFAULT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `domain` varchar(90) DEFAULT NULL,
  `referrer` varchar(255) DEFAULT NULL,
  `window_screen` varchar(20) DEFAULT NULL,
  `language` varchar(20) DEFAULT NULL,
  `cid` varchar(10) DEFAULT NULL,
  `cname` varchar(50) DEFAULT NULL,
  `cip` varchar(20) DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `leave_time` timestamp NULL DEFAULT NULL,
  `cookie_uuid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8 COMMENT='页面访问量表';

-- ----------------------------
-- Table structure for sila_site
-- ----------------------------
DROP TABLE IF EXISTS `sila_site`;
CREATE TABLE `sila_site` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL,
  `main_url` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='站点表';

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Function structure for GetAvgPageTime
-- ----------------------------
DROP FUNCTION IF EXISTS `GetAvgPageTime`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetAvgPageTime`(`p_sdate` varchar(10),`p_edate` varchar(10),`p_idsite` int,`p_ref` varchar(500)) RETURNS varchar(20) CHARSET utf8
BEGIN
	#Routine body goes here...
DECLARE v_time_diff int;
DECLARE v_hh varchar(10);
DECLARE v_mi varchar(10);
DECLARE v_ss varchar(10);
select 
AVG(abs(TIMESTAMPDIFF(SECOND ,t.leave_time ,t.start_time))) into v_time_diff
 from sila_log_visit t
WHERE
t.start_time> str_to_date(p_sdate,'%Y-%m-%d')
and t.start_time<DATE_add(STR_TO_DATE(p_edate,'%Y-%m-%d'),INTERVAL 1 day)
and t.idsite=p_idsite
and t.referrer=p_ref;

	set v_ss = v_time_diff mod 60;

	set v_hh = v_time_diff div (60*60);

	set v_mi = (v_time_diff div 60) mod 60;


	RETURN   CONCAT(LPAD(v_hh,2,'0'),":",LPAD(v_mi,2,'0'),":",LPAD(v_ss,2,'0'));
END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for GetNewUvNum
-- ----------------------------
DROP FUNCTION IF EXISTS `GetNewUvNum`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetNewUvNum`(`p_sdate` varchar(10),`p_edate` varchar(10),`p_idsite` int,`p_ref` varchar(500)) RETURNS int(11)
BEGIN
	DECLARE ret int;
	select count(DISTINCT t.cookie_uuid) into ret from sila_log_visit t
WHERE
t.start_time> str_to_date(p_sdate,'%Y-%m-%d')
and t.start_time<DATE_add(STR_TO_DATE(p_edate,'%Y-%m-%d'),INTERVAL 1 day)
and t.idsite=p_idsite
and t.referrer=p_ref
and not t.cookie_uuid in (select distinct cookie_uuid from sila_log_visit
where t.start_time<=str_to_date(p_sdate,'%Y-%m-%d')
and t.idsite=p_idsite
and t.referrer=p_ref
);

	RETURN ret;
END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for GetOrigin
-- ----------------------------
DROP FUNCTION IF EXISTS `GetOrigin`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetOrigin`(`reffer` varchar(200)) RETURNS varchar(10) CHARSET utf8
    COMMENT '根据reffer参数，返回\r\n1：外部链接\r\n2：搜索引擎\r\n3：直接访问'
BEGIN
	#Routine body goes here...
DECLARE nodata INT DEFAULT 0;
DECLARE ret   varchar(10) DEFAULT '-';
DECLARE v_domain varchar(100);

/* 声明游标 */
DECLARE rs CURSOR FOR SELECT domain FROM search_engine;

/* 异常处理 */
DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET nodata = 1;

	IF (reffer is null or reffer=''   ) THEN
		#直接访问
    RETURN '直接访问';
  ELSE 
    
		open rs;
		WHILE nodata = 0 DO#判断是不是到了最后一条数据
			FETCH rs INTO v_domain;
			IF (INSTR(reffer,v_domain)>0) THEN
				SET ret='搜索引擎';
				SET nodata=1;
			END IF;
		END WHILE;  
		CLOSE rs;
		IF ret='搜索引擎' THEN
			RETURN '搜索引擎';
		ELSE
			RETURN '外部链接'; 
		END IF;

	END IF;

	##RETURN ret;
END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for GetUvNum
-- ----------------------------
DROP FUNCTION IF EXISTS `GetUvNum`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetUvNum`(`p_date` varchar(10)) RETURNS int(11)
    COMMENT 'p_date参数必须是yyyy-mm-dd格式的日期字符串\r\n函数返回指定日期的uuid的数量'
BEGIN
	#Routine body goes here...
DECLARE ret int;
	select COUNT(DISTINCT t.cookie_uuid) into ret from sila_log_visit t where DATE_FORMAT(t.start_time, '%Y-%m-%d')=p_date ;

	RETURN ret;
END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for GetVisitNum
-- ----------------------------
DROP FUNCTION IF EXISTS `GetVisitNum`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetVisitNum`(`p_sdate` varchar(10),`p_edate` varchar(10),`p_idsite` int,`p_ref` varchar(500)) RETURNS int(11)
    COMMENT '\r\n'
BEGIN
	#Routine body goes here...
DECLARE nodata INT DEFAULT 0;
DECLARE ret INT DEFAULT 0;
DECLARE v_time timestamp;
DECLARE v_cookie VARCHAR(50);
DECLARE v_previous_cookie VARCHAR(50);
DECLARE v_previous_time timestamp;
/* 声明游标 */
DECLARE rs CURSOR FOR SELECT t.start_time,t.cookie_uuid FROM sila_log_visit t
WHERE 
t.start_time> str_to_date(p_sdate,'%Y-%m-%d')
and t.start_time<DATE_add(STR_TO_DATE(p_edate,'%Y-%m-%d'),INTERVAL 1 day)
and t.idsite=p_idsite
and t.referrer=p_ref
##and GetOrigin(t.referrer)='搜索引擎'
ORDER BY t.cookie_uuid,t.start_time
; 
 
/* 异常处理 */
DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET nodata = 1;

    set v_previous_cookie='';
		open rs;
		WHILE nodata = 0 DO#判断是不是到了最后一条数据
			FETCH rs INTO v_time,v_cookie;
			IF (v_previous_cookie<>v_cookie) THEN
				SET ret=ret+1;
			ELSE
				IF(TIMESTAMPDIFF(MINUTE,v_time,v_previous_time)>30) THEN
						SET ret=ret+1;
				END IF;
			END IF;
			set v_previous_cookie=v_cookie;
			SET v_previous_time=v_time;
		END WHILE;  
		CLOSE rs;
		
RETURN ret;
	
END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for IsOnePage
-- ----------------------------
DROP FUNCTION IF EXISTS `IsOnePage`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `IsOnePage`(`p_uvid` varchar(50)) RETURNS int(11)
    COMMENT '根据一个uuid，来判定是否仅仅访问了一个网页。\r\n是返回1（纳入跳出率标准），否返回0'
BEGIN
	#Routine body goes here...
	DECLARE ret INT DEFAULT 0;
select COUNT(DISTINCT t.page_url) into ret 
	from sila_log_visit t
	where t.cookie_uuid=p_uvid  ;

	IF ret=1 THEN
		RETURN 1;
	ELSE
		RETURN 0;
	END IF;
	
	
END
;;
DELIMITER ;
