-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: college_mgt
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `class_rooms`
--

DROP TABLE IF EXISTS `class_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_rooms` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d3c0bac512280ea676067a4044` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_rooms`
--

LOCK TABLES `class_rooms` WRITE;
/*!40000 ALTER TABLE `class_rooms` DISABLE KEYS */;
INSERT INTO `class_rooms` VALUES (1,'Class Room 1'),(2,'Class Room 2'),(4,'Class Room 3'),(5,'Class Room 4'),(6,'Class room 5'),(7,'Class Room 6');
/*!40000 ALTER TABLE `class_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor_class_rooms`
--

DROP TABLE IF EXISTS `professor_class_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professor_class_rooms` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `professor_id` bigint(20) unsigned DEFAULT '0',
  `class_room_id` bigint(20) unsigned NOT NULL,
  `day_id` int(11) NOT NULL,
  `time_slot_id` int(11) NOT NULL,
  `subject_id` bigint(20) unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_0aafd6dfed4fb0033031d0614a` (`class_room_id`,`day_id`,`time_slot_id`),
  UNIQUE KEY `IDX_c5ee557a1177eb4fb33c6fb9fe` (`professor_id`,`class_room_id`,`day_id`,`time_slot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor_class_rooms`
--

LOCK TABLES `professor_class_rooms` WRITE;
/*!40000 ALTER TABLE `professor_class_rooms` DISABLE KEYS */;
INSERT INTO `professor_class_rooms` VALUES (1,1,1,1,1,1),(2,1,1,1,2,1),(3,3,1,1,3,1),(4,3,1,1,4,2),(5,1,1,1,5,2),(6,1,1,1,6,2),(7,0,1,2,1,0),(8,0,1,2,2,0),(9,0,1,2,3,0),(10,0,1,2,4,0),(11,0,1,2,5,0),(12,0,1,2,6,0),(13,0,1,3,1,0),(14,0,1,3,2,0),(15,0,1,3,3,0),(16,0,1,3,4,0),(17,0,1,3,5,0),(18,0,1,3,6,0),(19,0,1,4,1,0),(20,0,1,4,2,0),(21,0,1,4,3,0),(22,0,1,4,4,0),(23,0,1,4,5,0),(24,0,1,4,6,0),(25,0,1,5,1,0),(26,0,1,5,2,0),(27,0,1,5,3,0),(28,0,1,5,4,0),(29,0,1,5,5,0),(30,0,1,5,6,0),(31,0,2,1,1,0),(32,0,2,1,2,0),(33,0,2,1,3,0),(34,0,2,1,4,0),(35,0,2,1,5,0),(36,0,2,1,6,0),(37,0,2,2,1,0),(38,0,2,2,2,0),(39,0,2,2,3,0),(40,0,2,2,4,0),(41,0,2,2,5,0),(42,0,2,2,6,0),(43,0,2,3,1,0),(44,0,2,3,2,0),(45,0,2,3,3,0),(46,0,2,3,4,0),(47,0,2,3,5,0),(48,0,2,3,6,0),(49,0,2,4,1,0),(50,0,2,4,2,0),(51,0,2,4,3,0),(52,0,2,4,4,0),(53,0,2,4,5,0),(54,0,2,4,6,0),(55,0,2,5,1,0),(56,0,2,5,2,0),(57,0,2,5,3,0),(58,0,2,5,4,0),(59,0,2,5,5,0),(60,0,2,5,6,0),(61,0,4,1,1,0),(62,0,4,1,2,0),(63,0,4,1,3,0),(64,0,4,1,4,0),(65,0,4,1,5,0),(66,0,4,1,6,0),(67,0,4,2,1,0),(68,0,4,2,2,0),(69,0,4,2,3,0),(70,0,4,2,4,0),(71,0,4,2,5,0),(72,0,4,2,6,0),(73,0,4,3,1,0),(74,0,4,3,2,0),(75,0,4,3,3,0),(76,0,4,3,4,0),(77,0,4,3,5,0),(78,0,4,3,6,0),(79,0,4,4,1,0),(80,0,4,4,2,0),(81,0,4,4,3,0),(82,0,4,4,4,0),(83,0,4,4,5,0),(84,0,4,4,6,0),(85,0,4,5,1,0),(86,0,4,5,2,0),(87,0,4,5,3,0),(88,0,4,5,4,0),(89,0,4,5,5,0),(90,0,4,5,6,0),(91,0,5,1,1,0),(92,0,5,1,2,0),(93,0,5,1,3,0),(94,0,5,1,4,0),(95,0,5,1,5,0),(96,0,5,1,6,0),(97,0,5,2,1,0),(98,0,5,2,2,0),(99,0,5,2,3,0),(100,0,5,2,4,0),(101,0,5,2,5,0),(102,0,5,2,6,0),(103,0,5,3,1,0),(104,0,5,3,2,0),(105,0,5,3,3,0),(106,0,5,3,4,0),(107,0,5,3,5,0),(108,0,5,3,6,0),(109,0,5,4,1,0),(110,0,5,4,2,0),(111,0,5,4,3,0),(112,0,5,4,4,0),(113,0,5,4,5,0),(114,0,5,4,6,0),(115,0,5,5,1,0),(116,0,5,5,2,0),(117,0,5,5,3,0),(118,0,5,5,4,0),(119,0,5,5,5,0),(120,0,5,5,6,0),(121,0,6,1,1,0),(122,0,6,1,2,0),(123,0,6,1,3,0),(124,0,6,1,4,0),(125,0,6,1,5,0),(126,0,6,1,6,0),(127,0,6,2,1,0),(128,0,6,2,2,0),(129,0,6,2,3,0),(130,0,6,2,4,0),(131,0,6,2,5,0),(132,0,6,2,6,0),(133,0,6,3,1,0),(134,0,6,3,2,0),(135,0,6,3,3,0),(136,0,6,3,4,0),(137,0,6,3,5,0),(138,0,6,3,6,0),(139,0,6,4,1,0),(140,0,6,4,2,0),(141,0,6,4,3,0),(142,0,6,4,4,0),(143,0,6,4,5,0),(144,0,6,4,6,0),(145,0,6,5,1,0),(146,0,6,5,2,0),(147,0,6,5,3,0),(148,0,6,5,4,0),(149,0,6,5,5,0),(150,0,6,5,6,0),(151,0,7,1,1,0),(152,0,7,1,2,0),(153,0,7,1,3,0),(154,0,7,1,4,0),(155,0,7,1,5,0),(156,0,7,1,6,0),(157,0,7,2,1,0),(158,0,7,2,2,0),(159,0,7,2,3,0),(160,0,7,2,4,0),(161,0,7,2,5,0),(162,0,7,2,6,0),(163,0,7,3,1,0),(164,0,7,3,2,0),(165,0,7,3,3,0),(166,0,7,3,4,0),(167,0,7,3,5,0),(168,0,7,3,6,0),(169,0,7,4,1,0),(170,0,7,4,2,0),(171,0,7,4,3,0),(172,0,7,4,4,0),(173,0,7,4,5,0),(174,0,7,4,6,0),(175,0,7,5,1,0),(176,0,7,5,2,0),(177,0,7,5,3,0),(178,0,7,5,4,0),(179,0,7,5,5,0),(180,0,7,5,6,0);
/*!40000 ALTER TABLE `professor_class_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor_subjects`
--

DROP TABLE IF EXISTS `professor_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professor_subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `professor_id` bigint(20) unsigned NOT NULL,
  `subject_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor_subjects`
--

LOCK TABLES `professor_subjects` WRITE;
/*!40000 ALTER TABLE `professor_subjects` DISABLE KEYS */;
INSERT INTO `professor_subjects` VALUES (7,2,3),(8,2,1),(9,3,1),(10,3,2),(14,4,3),(15,4,1),(16,4,2),(17,1,1),(18,1,2),(19,1,3),(20,1,4);
/*!40000 ALTER TABLE `professor_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professors`
--

DROP TABLE IF EXISTS `professors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professors` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9dc9c692acaea581e35574a654` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professors`
--

LOCK TABLES `professors` WRITE;
/*!40000 ALTER TABLE `professors` DISABLE KEYS */;
INSERT INTO `professors` VALUES (1,'Ashish 1'),(2,'Professor 1'),(4,'Professor 2'),(3,'Professor 3');
/*!40000 ALTER TABLE `professors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_47a287fe64bd0e1027e603c335` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (4,'ASP.Net'),(3,'Java'),(1,'Laravel'),(2,'PHP');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-14 23:09:03
