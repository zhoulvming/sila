/*
Navicat MySQL Data Transfer

Source Server         : local--
Source Server Version : 50624
Source Host           : 127.0.0.1:3306
Source Database       : digtal

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-11-26 21:32:23
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
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8 COMMENT='页面访问量表';

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
