/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : digtal

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-11-24 18:01:07
*/

SET FOREIGN_KEY_CHECKS=0;

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
	DECLARE ret   varchar(10);

	IF (reffer is null or reffer=''   ) THEN
		#直接访问
    SET ret='直接访问';
  ELSE 
    #这里要添加判断搜索引擎条件
		IF (INSTR(reffer,'baidu')>0||INSTR(reffer,'google')>0||INSTR(reffer,'sogou')>0) THEN
			SET ret='搜索引擎';
		ELSE
			SET ret='外部链接';
		END IF;
	END IF;

	RETURN ret;
END
;;
DELIMITER ;
