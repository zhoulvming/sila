/*
Navicat MySQL Data Transfer

Source Server         : local--
Source Server Version : 50624
Source Host           : 127.0.0.1:3306
Source Database       : digtal

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-11-24 21:36:03
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COMMENT='页面访问量表';

-- ----------------------------
-- Table structure for sila_log_visit_bak
-- ----------------------------
DROP TABLE IF EXISTS `sila_log_visit_bak`;
CREATE TABLE `sila_log_visit_bak` (
  `uuid` varchar(50) NOT NULL,
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
  `start_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `leave_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='页面访问表';

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
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `studentId` int(11) NOT NULL,
  `studentName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
