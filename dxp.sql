/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50716
 Source Host           : localhost:3306
 Source Schema         : dxp

 Target Server Type    : MySQL
 Target Server Version : 50716
 File Encoding         : 65001

 Date: 17/04/2020 16:50:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for auto_caseinfo
-- ----------------------------
DROP TABLE IF EXISTS `auto_caseinfo`;
CREATE TABLE `auto_caseinfo`  (
  `id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `moduleId` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `className` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `packageName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `simpleClassName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `groups` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `priority` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `data` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `dataNum` int(11) DEFAULT NULL,
  `gitUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auto_caseinfo
-- ----------------------------
INSERT INTO `auto_caseinfo` VALUES ('1586261773167004', '1586261773167001', 'assertEqualsExtTest', 'assertEqualsExtTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L104', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773167005', '1586261773167001', 'assertNullTest', 'assertNullTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L172', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773167006', '1586261773167001', 'assertEqualsTest', 'assertEqualsTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L76', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773167007', '1586261773167001', 'assertExceptionTest', 'assertExceptionTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L209', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773167008', '1586261773167001', 'assertNotEqualsTest', 'assertNotEqualsTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L155', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773167009', '1586261773167001', 'assertSameTest', 'assertSameTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L190', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773186000', '1586261773167001', 'assertNotNullTest', 'assertNotNullTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L181', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773186001', '1586261773167001', 'assertTrueTest', 'assertTrueTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L50', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773186002', '1586261773167001', 'assertFalseTest', 'assertFalseTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L59', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773186003', '1586261773167001', 'assertExceptionMsgTest', 'assertExceptionMsgTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L215', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773186004', '1586261773167001', 'assertFailTest', 'assertFailTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L67', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773186005', '1586261773167001', 'assertNotSameTest', 'assertNotSameTest', 'com.duanlei.productDemo.testcase.basicdemo.AssertDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'AssertDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/AssertDemo.java#L201', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773186006', '1586261773167002', 'dataProviderTest', 'dataProviderTest', 'com.duanlei.productDemo.testcase.basicdemo.DataProviderDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'DataProviderDemo', '[\"ut\"]', NULL, '[\"[\\\"id001\\\",\\\"new Integer(1)\\\",2,true]\",\"[\\\"id002\\\",\\\"new Integer(2)\\\",2,false]\"]', 2, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/DataProviderDemo.java#L33', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773186007', '1586261773167003', 'dataFromXLSXTest', '测试从 excel .xlsx 文件引入测试数据2', 'com.duanlei.productDemo.testcase.basicdemo.FileProviderDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'FileProviderDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/FileProviderDemo.java#L53', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773186008', '1586261773167003', 'dataFromXLSTest', '测试从文件引入测试数据2', 'com.duanlei.productDemo.testcase.basicdemo.FileProviderDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'FileProviderDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/FileProviderDemo.java#L44', 1);
INSERT INTO `auto_caseinfo` VALUES ('1586261773186009', '1586261773167003', 'dataFromCSVTest', '测试从 csv 文件引入测试数据', 'com.duanlei.productDemo.testcase.basicdemo.FileProviderDemo', 'com.duanlei.productDemo.testcase.basicdemo', 'FileProviderDemo', '[\"ut\"]', NULL, '[]', 0, 'http://192.168.18.132/wb-dl321273/CaseDemo/blob/master/src/main/java/com/duanlei/productDemo/testcase/basicdemo/FileProviderDemo.java#L32', 1);

-- ----------------------------
-- Table structure for auto_moduleinfo
-- ----------------------------
DROP TABLE IF EXISTS `auto_moduleinfo`;
CREATE TABLE `auto_moduleinfo`  (
  `id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parentId` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `testSuiteId` int(11) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auto_moduleinfo
-- ----------------------------
INSERT INTO `auto_moduleinfo` VALUES ('1586261773167000', 'head', 1, 'basicdemo', 1, 1);
INSERT INTO `auto_moduleinfo` VALUES ('1586261773167001', '1586261773167000', 1, 'AssertDemo', 2, 1);
INSERT INTO `auto_moduleinfo` VALUES ('1586261773167002', '1586261773167000', 1, 'DataProviderDemo', 2, 1);
INSERT INTO `auto_moduleinfo` VALUES ('1586261773167003', '1586261773167000', 1, 'FileProviderDemo', 2, 1);

-- ----------------------------
-- Table structure for auto_testsuitelist
-- ----------------------------
DROP TABLE IF EXISTS `auto_testsuitelist`;
CREATE TABLE `auto_testsuitelist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `gitUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `config` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `confFileName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `caseRootPackage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `refCount` int(11) DEFAULT 0,
  `status` int(4) DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `version` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `branch` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `createtime` timestamp(0) DEFAULT NULL,
  `gitType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sshUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 277 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auto_testsuitelist
-- ----------------------------
INSERT INTO `auto_testsuitelist` VALUES (1, '测试', 1, 'http://192.168.18.132/wb-dl321273/CaseDemo.git', 'API', '[{\"key\":\"userKeyId\",\"value\":\"xxxx\",\"$$hashKey\":\"object:192\"},{\"key\":\"requestUrl\",\"value\":\"xxxxcc\",\"$$hashKey\":\"object:193\"},{\"key\":\"userKeySecret\",\"value\":\"xxxx\",\"$$hashKey\":\"object:194\"}]', 'conf.properties', 'testcase', 0, 1, '新增模块个数:0新增用例个数:0;更新用例个数:16 耗时:1 seconds 79 milliSeconds', '1.0.0', NULL, 'master', '2020-04-07 15:46:10', NULL, 'git@192.168.18.132:wb-dl321273/CaseDemo.git');
INSERT INTO `auto_testsuitelist` VALUES (276, '测试5', NULL, 'http://192.168.18.132/wb-dl321273/CaseDemo.git', 'API', '[{\"key\":\"userKeyId\",\"value\":\"xxxx\",\"$$hashKey\":\"object:141\"},{\"key\":\"requestUrl\",\"value\":\"xxxxcc\",\"$$hashKey\":\"object:142\"},{\"key\":\"userKeySecret\",\"value\":\"xxxx\",\"$$hashKey\":\"object:143\"}]', 'conf.properties', 'testcase', 0, 3, '下载代码失败', '', '测试套添加测试2', 'master', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for common_status
-- ----------------------------
DROP TABLE IF EXISTS `common_status`;
CREATE TABLE `common_status`  (
  `id` tinyint(4) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `chs_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of common_status
-- ----------------------------
INSERT INTO `common_status` VALUES (1, 'normal', '正常');
INSERT INTO `common_status` VALUES (2, 'delete', '删除');
INSERT INTO `common_status` VALUES (3, 'abnormal', '异常');
INSERT INTO `common_status` VALUES (10, 'ready', '就绪');
INSERT INTO `common_status` VALUES (11, 'running', '运行中');
INSERT INTO `common_status` VALUES (12, 'stop', '停止');
INSERT INTO `common_status` VALUES (13, 'close', '关闭');
INSERT INTO `common_status` VALUES (14, 'complete', '完成');
INSERT INTO `common_status` VALUES (17, 'released', '已发布');

SET FOREIGN_KEY_CHECKS = 1;
