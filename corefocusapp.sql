-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2024 at 03:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `corefocusapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `opportunities`
--

CREATE TABLE `opportunities` (
  `opportunityId` int(11) NOT NULL,
  `organizationId` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `opportunities`
--

INSERT INTO `opportunities` (`opportunityId`, `organizationId`, `title`, `description`, `date`, `time`, `location`) VALUES
(1, 1, '\"Cooking a delicious meal \"', 'Lend a helping hand by cooking', '2024-07-09', '18:48:37', 'Jurong green community centre'),
(11, 1, 'gh', 'isj', '2024-07-03', '02:20:00', 'club'),
(12, 1, 'hjuebuebe', 'isj', '2024-07-02', '02:18:00', 'club'),
(14, 1, 'gh', 'isj', '2024-07-02', '21:15:00', 'club');

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `organizationId` int(11) NOT NULL,
  `organizationName` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `contactEmail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`organizationId`, `organizationName`, `description`, `contactEmail`) VALUES
(1, 'Caring_Soul', 'Dedicated to helping the needy', 'Caring_souls@gmail.com'),
(3, 'tekKnight', 'Encourage people with depression', 'tekknight@gmail.com'),
(4, 'FlamingCoin', 'Reach out to the elderly people', 'FlamingCoin@gmail.com'),
(6, 'Anna Chia', 'Encourage people with depression', 'tekknight@gmail.com'),
(8, 'FlamingCoin', 'isj', 'FlamingCoin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `registrationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `opportunity` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`registrationId`, `userId`, `name`, `opportunity`, `status`) VALUES
(1, 1, 'cameron', 'helping the elderly', 'registered'),
(2, 3, 'Ho Xu YI', 'helping the elderly', 'unregistered'),
(3, 1, 'Ho Xu YI', 'helping the elderly', 'unregistered'),
(4, 1, 'Ho Xu YI', 'helping the elderly', 'unregistered'),
(5, 1, 'Ho Xu YI', 'helping the elderly', 'unregistered');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `name`, `email`, `contact`, `profile`) VALUES
(1, 'cameron', 'cameron@gmail.com', '9243637', 'https://media.istockphoto.com/id/1536734024/photo/happy-young-asian-woman-hugging-cat-on-bed-at-home-good-friends-friendship-of-a-pet-and-its.jpg?s=1024x1024&w=is&k=20&c=6JpdwEnMZPnJLcxkVRV9HxqvsO-hnFgassSU03sYowA='),
(3, 'Wesley', 'Wesley@gmail.com', '87289293', 'https://media.istockphoto.com/id/1962793424/photo/steamed-seabass-fish-with-soybean-paste-sauce-in-white-plate.jpg?s=1024x1024&w=is&k=20&c=qs3awQvNi4tu1qMrhWSpJU5rCAaxhX57ZuSrXRkahbI='),
(15, 'Ho Xu YI', '22019468@myrp.edu.sg', '12312312', 'https://images.unsplash.com/photo-1524685794168-52985e79c1f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `opportunities`
--
ALTER TABLE `opportunities`
  ADD PRIMARY KEY (`opportunityId`),
  ADD KEY `opportunities_ibfk_1` (`organizationId`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`organizationId`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`registrationId`),
  ADD KEY `registrations_ibfk_1` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `opportunities`
--
ALTER TABLE `opportunities`
  MODIFY `opportunityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `organizationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `registrationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `opportunities`
--
ALTER TABLE `opportunities`
  ADD CONSTRAINT `opportunities_ibfk_1` FOREIGN KEY (`organizationId`) REFERENCES `organizations` (`organizationId`);

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
