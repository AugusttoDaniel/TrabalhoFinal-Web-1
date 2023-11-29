-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lanchonete
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Endereco` text COLLATE utf8mb4_unicode_ci,
  `Telefone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'João Silva','joao.silva@email.com','Rua Exemplo, 123','12345-6789','2023-11-29 03:38:45','2023-11-29 03:38:45'),(2,'João fdfd','joao.silva@fdfd.com','Rua Exemplo, 123','ffff-6789','2023-11-29 03:38:57','2023-11-29 03:38:57');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itempedidos`
--

DROP TABLE IF EXISTS `itempedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itempedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `PedidoID` int DEFAULT NULL,
  `ProdutoID` int DEFAULT NULL,
  `Quantidade` int DEFAULT NULL,
  `PrecoUnitario` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itempedidos`
--

LOCK TABLES `itempedidos` WRITE;
/*!40000 ALTER TABLE `itempedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `itempedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ClienteID` int DEFAULT NULL,
  `DataPedido` datetime DEFAULT NULL,
  `Status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,2,'2023-11-16 00:00:00','pendente','2023-11-29 02:56:07','2023-11-29 02:56:07'),(2,2,'2023-11-16 00:00:00','pendente','2023-11-29 02:59:57','2023-11-29 02:59:57');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Categoria` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Nome` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Descricao` text COLLATE utf8mb4_unicode_ci,
  `Preco` decimal(10,0) DEFAULT NULL,
  `Estoque` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Pizza','Pizza Margherita','Pizza tradicional com molho de tomate, mussarela e manjericão.',26,50,'2023-11-17 23:06:27','2023-11-17 23:06:27'),(2,'Pizza','Pizza Pepperoni','Pizza com fatias generosas de pepperoni e queijo.',28,40,'2023-11-17 23:06:39','2023-11-17 23:06:39'),(3,'Pizza','Pizza Quatro Queijos','Combinação de quatro tipos de queijos: gorgonzola, parmesão, mussarela e provolone.',30,35,'2023-11-17 23:06:55','2023-11-17 23:06:55'),(4,'Pizza','Pizza Vegana','Pizza com ingredientes 100% veganos, incluindo queijo vegetal e legumes frescos.',29,30,'2023-11-17 23:07:03','2023-11-17 23:07:03'),(5,'Pizza','Pizza Frango com Catupiry','Pizza coberta com frango desfiado e catupiry.',27,45,'2023-11-17 23:07:12','2023-11-17 23:07:12'),(6,'Pizza','Pizza Portuguesa','Pizza com presunto, ovos, cebola, pimentão e azeitonas.',28,50,'2023-11-17 23:07:24','2023-11-17 23:07:24'),(7,'Pizza','Pizza de Calabresa','Pizza com fatias de calabresa e cebola.',27,40,'2023-11-17 23:07:31','2023-11-17 23:07:31'),(8,'Hambúrguer','Hambúrguer Clássico','Hambúrguer de carne bovina com alface, tomate e molho especial.',16,60,'2023-11-17 23:08:08','2023-11-17 23:08:08'),(9,'Hambúrguer','Cheeseburger','Hambúrguer de carne com queijo cheddar, alface e molho.',17,55,'2023-11-17 23:08:16','2023-11-17 23:08:16'),(10,'Hambúrguer','Hambúrguer Vegetariano','Hambúrguer feito de legumes e grãos, servido com molho de ervas.',15,50,'2023-11-17 23:08:23','2023-11-17 23:08:23'),(11,'Hambúrguer','Bacon Burger','Hambúrguer de carne com fatias de bacon crocante, queijo e molho barbecue.',19,40,'2023-11-17 23:08:33','2023-11-17 23:08:33'),(12,'Hambúrguer','Hambúrguer Picante','Hambúrguer com molho picante, jalapeños e queijo pepper jack.',18,45,'2023-11-17 23:08:39','2023-11-17 23:08:39'),(13,'Hambúrguer','Double Burger','Dois hambúrgueres empilhados com queijo, alface, tomate e cebola.',20,35,'2023-11-17 23:08:47','2023-11-17 23:08:47'),(14,'Hambúrguer','Hambúrguer Gourmet','Hambúrguer de carne de primeira qualidade com ingredientes premium.',23,30,'2023-11-17 23:08:53','2023-11-17 23:08:53'),(15,'Bebidas','Coca-Cola','Refrigerante de cola de 350ml.',3,100,'2023-11-17 23:09:08','2023-11-17 23:09:08'),(16,'Bebidas','Água Mineral','Garrafa de água mineral sem gás de 500ml.',2,150,'2023-11-17 23:09:16','2023-11-17 23:09:16'),(17,'Bebidas','Suco de Laranja Natural','Suco natural de laranja, sem adição de açúcares, 300ml.',5,80,'2023-11-17 23:09:24','2023-11-17 23:09:24'),(18,'Bebidas','Chá Gelado','Chá gelado caseiro de pêssego, 300ml.',4,70,'2023-11-17 23:09:30','2023-11-17 23:09:30'),(19,'Bebidas','Milkshake de Chocolate','Milkshake de chocolate cremoso, 400ml.',6,60,'2023-11-17 23:09:37','2023-11-17 23:09:37'),(20,'Bebidas','Café Expresso','Café expresso forte e encorpado, 50ml.',3,100,'2023-11-17 23:09:43','2023-11-17 23:09:43'),(21,'Bebidas','Smoothie de Frutas','Smoothie feito com uma mistura de frutas da estação, 350ml.',7,50,'2023-11-17 23:09:48','2023-11-17 23:09:48'),(22,'Doces','Torta de Chocolate','Fatia de torta de chocolate com cobertura de ganache.',5,30,'2023-11-17 23:10:50','2023-11-17 23:10:50'),(23,'Doces','Sorvete de Baunilha','Pote de sorvete de baunilha, 500ml.',7,25,'2023-11-17 23:10:56','2023-11-17 23:10:56'),(24,'Doces','Cheesecake de Morango','Fatia de cheesecake com cobertura de morango fresco.',6,40,'2023-11-17 23:11:02','2023-11-17 23:11:02'),(25,'Doces','Brownie de Nozes','Brownie de chocolate com nozes, uma unidade.',4,50,'2023-11-17 23:11:08','2023-11-17 23:11:08'),(26,'Doces','Macaron Sortido','Pacote com cinco macarons de sabores variados.',8,20,'2023-11-17 23:11:16','2023-11-17 23:11:16'),(27,'Doces','Donut Glaceado','Donut com cobertura glaceada e confeitos coloridos.',3,60,'2023-11-17 23:11:21','2023-11-17 23:11:21'),(28,'Doces','Cupcake de Red Velvet','Cupcake de red velvet com creme de queijo.',5,35,'2023-11-17 23:11:26','2023-11-17 23:11:26');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20231113192257-create-cliente.js'),('20231113192312-create-produto.js'),('20231113192326-create-pedido.js'),('20231113192345-create-item-pedido.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-29 10:59:25
