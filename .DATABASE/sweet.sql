/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

DROP DATABASE IF EXISTS `slatkisi`;
CREATE DATABASE IF NOT EXISTS `slatkisi` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `slatkisi`;

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`) VALUES
	(17, 'admin', 'C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int unsigned NOT NULL AUTO_INCREMENT,
  `price` int unsigned NOT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `cart`;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

DROP TABLE IF EXISTS `color`;
CREATE TABLE IF NOT EXISTS `color` (
  `color_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`color_id`),
  UNIQUE KEY `uq_color_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `color`;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` (`color_id`, `name`) VALUES
	(1, 'brown');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;

DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE IF NOT EXISTS `ingredient` (
  `ingredient_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ingredient_id`),
  UNIQUE KEY `uq_ingredient_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `ingredient`;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` (`ingredient_id`, `name`) VALUES
	(2, 'butter'),
	(1, 'cocoa'),
	(4, 'flour'),
	(3, 'milk');
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;

DROP TABLE IF EXISTS `kind`;
CREATE TABLE IF NOT EXISTS `kind` (
  `kind_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`kind_id`),
  UNIQUE KEY `uq_kind_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `kind`;
/*!40000 ALTER TABLE `kind` DISABLE KEYS */;
INSERT INTO `kind` (`kind_id`, `name`) VALUES
	(2, 'birthday'),
	(1, 'chocolate');
/*!40000 ALTER TABLE `kind` ENABLE KEYS */;

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('rejected','accepted','shipped','pending') NOT NULL DEFAULT 'pending',
  `customer_name` varchar(50) NOT NULL,
  `customer_address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` int unsigned NOT NULL,
  `customer_phone` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `uq_order_cart_id` (`cart_id`),
  CONSTRAINT `fk_order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `order`;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

DROP TABLE IF EXISTS `origin`;
CREATE TABLE IF NOT EXISTS `origin` (
  `origin_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`origin_id`),
  UNIQUE KEY `uq_origin_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `origin`;
/*!40000 ALTER TABLE `origin` DISABLE KEYS */;
INSERT INTO `origin` (`origin_id`, `name`) VALUES
	(1, 'UK');
/*!40000 ALTER TABLE `origin` ENABLE KEYS */;

DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int unsigned NOT NULL AUTO_INCREMENT,
  `sweet_id` int unsigned NOT NULL DEFAULT '0',
  `image_path` varchar(250) NOT NULL DEFAULT '0',
  `primary` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `uq_photo_image_path` (`image_path`),
  KEY `fk_photo_sweet_id` (`sweet_id`),
  CONSTRAINT `fk_photo_sweet_id` FOREIGN KEY (`sweet_id`) REFERENCES `sweet` (`sweet_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `photo`;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

DROP TABLE IF EXISTS `sweet`;
CREATE TABLE IF NOT EXISTS `sweet` (
  `sweet_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `description` varchar(250) NOT NULL DEFAULT '0',
  `color_id` int unsigned NOT NULL,
  `origin_id` int unsigned NOT NULL,
  `price` int unsigned NOT NULL,
  `unit` enum('gr','pcs') NOT NULL DEFAULT 'gr',
  PRIMARY KEY (`sweet_id`),
  KEY `fk_sweet_color_id` (`color_id`),
  KEY `fk_sweet_origin_id` (`origin_id`),
  CONSTRAINT `fk_sweet_color_id` FOREIGN KEY (`color_id`) REFERENCES `color` (`color_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sweet_origin_id` FOREIGN KEY (`origin_id`) REFERENCES `origin` (`origin_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `sweet`;
/*!40000 ALTER TABLE `sweet` DISABLE KEYS */;
INSERT INTO `sweet` (`sweet_id`, `name`, `description`, `color_id`, `origin_id`, `price`, `unit`) VALUES
	(1, 'Chocolate cake', 'Delicious spongy chocolate cake', 1, 1, 100, 'gr');
/*!40000 ALTER TABLE `sweet` ENABLE KEYS */;

DROP TABLE IF EXISTS `sweet_cart`;
CREATE TABLE IF NOT EXISTS `sweet_cart` (
  `sweet_cart_id` int unsigned NOT NULL AUTO_INCREMENT,
  `sweet_id` int unsigned NOT NULL DEFAULT '0',
  `cart_id` int unsigned NOT NULL DEFAULT '0',
  `quantity` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`sweet_cart_id`),
  UNIQUE KEY `uq_sweet_cart_sweet_id_cart_id` (`sweet_id`,`cart_id`),
  KEY `fk_sweet_cart_cart_id` (`cart_id`),
  CONSTRAINT `fk_sweet_cart_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sweet_cart_sweet_id` FOREIGN KEY (`sweet_id`) REFERENCES `sweet` (`sweet_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `sweet_cart`;
/*!40000 ALTER TABLE `sweet_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `sweet_cart` ENABLE KEYS */;

DROP TABLE IF EXISTS `sweet_ingredient`;
CREATE TABLE IF NOT EXISTS `sweet_ingredient` (
  `sweet_ingredient` int unsigned NOT NULL AUTO_INCREMENT,
  `sweet_id` int unsigned NOT NULL DEFAULT '0',
  `ingredient_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`sweet_ingredient`),
  UNIQUE KEY `uq_sweet_ingredient_sweet_id_ingredient_id` (`sweet_id`,`ingredient_id`),
  KEY `fk_sweet_ingredient_ingredient_id` (`ingredient_id`),
  CONSTRAINT `fk_sweet_ingredient_ingredient_id` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`ingredient_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sweet_ingredient_sweet_id` FOREIGN KEY (`sweet_id`) REFERENCES `sweet` (`sweet_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `sweet_ingredient`;
/*!40000 ALTER TABLE `sweet_ingredient` DISABLE KEYS */;
INSERT INTO `sweet_ingredient` (`sweet_ingredient`, `sweet_id`, `ingredient_id`) VALUES
	(2, 1, 1),
	(1, 1, 2);
/*!40000 ALTER TABLE `sweet_ingredient` ENABLE KEYS */;

DROP TABLE IF EXISTS `sweet_kind`;
CREATE TABLE IF NOT EXISTS `sweet_kind` (
  `sweet_kind_id` int unsigned NOT NULL AUTO_INCREMENT,
  `sweet_id` int unsigned NOT NULL DEFAULT '0',
  `kind_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`sweet_kind_id`),
  UNIQUE KEY `uq_sweet_kind_sweet_id_kind_id` (`sweet_id`,`kind_id`),
  KEY `fk_sweet_kind_kind_id` (`kind_id`),
  CONSTRAINT `fk_sweet_kind_kind_id` FOREIGN KEY (`kind_id`) REFERENCES `kind` (`kind_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sweet_kind_sweet_id` FOREIGN KEY (`sweet_id`) REFERENCES `sweet` (`sweet_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `sweet_kind`;
/*!40000 ALTER TABLE `sweet_kind` DISABLE KEYS */;
INSERT INTO `sweet_kind` (`sweet_kind_id`, `sweet_id`, `kind_id`) VALUES
	(1, 1, 1);
/*!40000 ALTER TABLE `sweet_kind` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
