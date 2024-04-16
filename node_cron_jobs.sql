-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2024 at 03:41 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_cron_jobs`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(5) NOT NULL,
  `category_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Stationary'),
(2, 'Clothes'),
(3, 'Chocolates'),
(4, 'Food Oil'),
(5, 'Purse'),
(6, 'Cosmetics');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(5) NOT NULL,
  `product_name` varchar(20) DEFAULT NULL,
  `product_desc` varchar(100) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `discount_percent` float NOT NULL,
  `discounted_price` float NOT NULL,
  `product_sku` int(10) DEFAULT NULL,
  `variant_id` int(5) DEFAULT NULL,
  `category_id` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_desc`, `price`, `discount_percent`, `discounted_price`, `product_sku`, `variant_id`, `category_id`) VALUES
(1, 'Dairy Milk', 'jasbfakje fkjesf lakjef a', 20, 2, 19.6, 561213166, 5, 3),
(2, 'Bounty', 'kjsdf bjskdfh sjkdrf ghksjdrgrh kjsdlrl ', 60, 5, 57, 234589785, 2, 3),
(3, 'Lipstick', 'hj bgfskjdfgh ', 250, 15, 212.5, 254635652, 3, 6),
(4, 'Blush', 'hjsrdf hskjdf ghseglkjs ', 500, 10, 450, 654657867, 9, 6),
(5, 'Pen', 'kjaewrshf sm lrigkh ', 50, 0, 50, 654654655, 8, 1),
(6, 'Pencil', 'jskegh kjsleg hsl', 20, 0, 20, 654565446, 1, 1),
(7, 'Hand Bag', 'ijekrh gserkj ', 800, 30, 560, 654564455, 11, 5),
(8, 'Jeans', 'jeksr ghsjkers.ajersksl', 1500, 20, 1200, 654654600, 7, 5);

-- --------------------------------------------------------

--
-- Table structure for table `update_counter`
--

CREATE TABLE `update_counter` (
  `id` int(5) NOT NULL,
  `counter` int(5) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `update_counter`
--

INSERT INTO `update_counter` (`id`, `counter`) VALUES
(1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `products`
--
  ALTER TABLE `products`
    ADD PRIMARY KEY (`product_id`),
    ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `update_counter`
--
ALTER TABLE `update_counter`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `update_counter`
--
ALTER TABLE `update_counter`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
