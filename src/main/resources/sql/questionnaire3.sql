/*
 Navicat Premium Data Transfer

 Source Server         : linuxLiying
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : 10.0.2.2:3306
 Source Schema         : questionnaire

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 13/06/2022 14:06:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for project_info
-- ----------------------------
DROP TABLE IF EXISTS `project_info`;
CREATE TABLE `project_info`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '项目表主键',
  `user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id（没有用）',
  `project_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目名称',
  `project_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '项目说明',
  `created_by` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `creation_date` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `last_updated_by` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '最后修改人',
  `last_update_date` datetime NULL DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project_info
-- ----------------------------
INSERT INTO `project_info` VALUES ('bcb2f0512e5b48999e099b2616e5ba10', NULL, '名字新', 'adda', 'admin', '2022-06-06 11:39:17', 'admin', '2022-06-13 13:45:18');

-- ----------------------------
-- Table structure for questionnaire_info
-- ----------------------------
DROP TABLE IF EXISTS `questionnaire_info`;
CREATE TABLE `questionnaire_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `project_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `question_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `data_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `question_end_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `question_stop` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `release_time` timestamp NULL DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `answer_total` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_by` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL,
  `last_updated_by` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_update_date` timestamp NULL DEFAULT NULL,
  `question_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `question_title` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `question` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `context` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `questionnaire_info_project_info_id_fk`(`project_id`) USING BTREE,
  CONSTRAINT `questionnaire_info_project_info_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of questionnaire_info
-- ----------------------------
INSERT INTO `questionnaire_info` VALUES ('1cb11e5f58ef4a54adf40696c1ba9d14', 'bcb2f0512e5b48999e099b2616e5ba10', '测试1', NULL, NULL, '5', NULL, '2022-06-13 00:00:00', '2022-06-20 21:31:46', '0', NULL, NULL, NULL, NULL, '测试1测试1测试1', '啊深度发士大夫&123123&54345&撒的发生的&深度发士大夫&啊深度发士大夫&士大夫&', '[{\"questionType\":\"0\",\"questionTitle\":\"啊深度发士大夫\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"啊士大夫必答题\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"123123\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题444\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"54345\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题345\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"撒的发生的\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题5677\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"深度发士大夫\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题画几个客户机\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"啊深度发士大夫\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题韩国房价很高\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"士大夫\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题啊士大夫共和国\",\"optionGrade\":\"\"}],\"important\":\"必答题\"}]', NULL);
INSERT INTO `questionnaire_info` VALUES ('31007ba76fe044f8ba64a34fb33a091e', NULL, 'asdf', '1', NULL, '0', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, 'asdf', NULL, NULL, NULL);
INSERT INTO `questionnaire_info` VALUES ('3ee02c28aa8c468b9899e759da7359a5', NULL, 'sadf', '1', NULL, '0', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, 'gdfgdfafdgagdfg', NULL, NULL, NULL);
INSERT INTO `questionnaire_info` VALUES ('6329bfd0ac7b4eeb87bf74292cefba5a', 'bcb2f0512e5b48999e099b2616e5ba10', '测试3', '1', NULL, '5', NULL, '2022-06-14 00:00:00', '2022-06-21 12:41:46', '0', NULL, NULL, NULL, NULL, '测试33', '啊深度发士大夫&123123&深度发士大夫&54345&撒的发生的&啊深度发士大夫&士大夫&', '[{\"questionType\":\"0\",\"questionTitle\":\"啊深度发士大夫\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"啊士大夫必答题\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"123123\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题444\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"深度发士大夫\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题画几个客户机\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"54345\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题345\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"撒的发生的\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题5677\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"啊深度发士大夫\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题韩国房价很高\",\"optionGrade\":\"\"}],\"important\":\"必答题\"},{\"questionType\":\"0\",\"questionTitle\":\"士大夫\",\"questionOption\":[{\"lineTitle\":\"\",\"optionWord\":\"必答题啊士大夫共和国\",\"optionGrade\":\"\"}],\"important\":\"必答题\"}]', NULL);
INSERT INTO `questionnaire_info` VALUES ('a96d763ccf48475990149a1b672cd8c5', NULL, 'ghjk', '1', NULL, '0', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, 'hjk', NULL, NULL, NULL);
INSERT INTO `questionnaire_info` VALUES ('c2caf79cc3ce410f8c71fd6490f5e7bb', NULL, '新模板', '1', NULL, '0', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, '新模板', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户表主键',
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `start_time` datetime NULL DEFAULT NULL COMMENT '开始时间',
  `stop_time` datetime NULL DEFAULT NULL COMMENT '截止时间（时间戳）',
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否启用（1启用，0不启用）',
  `created_by` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `creation_date` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `last_updated_by` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '最后修改人',
  `last_update_date` datetime NULL DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('225b8c1d703944f7881129cc7030aa7c', 'delta', '2', '2022-05-27 12:19:27', '2022-06-26 12:19:27', '1', 'admin', '2022-05-27 12:19:45', 'admin', '2022-05-27 12:19:45');
INSERT INTO `user_info` VALUES ('8ceeee2995f3459ba1955f85245dc7a5', 'admin', '1', '2018-12-04 21:40:05', '2021-09-27 21:40:00', '1', 'admin', '2018-10-22 09:12:40', 'admin', '2018-12-04 21:40:13');
INSERT INTO `user_info` VALUES ('d351f2513b174b98a3baf87edb56a052', 'sad', 'ads', '2022-05-27 12:16:07', '2022-06-26 12:16:07', '1', 'admin', '2022-05-27 12:17:46', 'admin', '2022-05-27 12:17:46');

-- ----------------------------
-- Procedure structure for demo_in_parameter
-- ----------------------------
DROP PROCEDURE IF EXISTS `demo_in_parameter`;
delimiter ;;
CREATE PROCEDURE `demo_in_parameter`(IN p_in int)
BEGIN
SELECT p_in;
SET p_in = 2;
SELECT p_in;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_name
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_name`;
delimiter ;;
CREATE PROCEDURE `sp_name`(in id int)
begin
SELECT id;
set id = 2;
SELECT id;
end
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
