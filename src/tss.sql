-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2022 at 10:44 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tss`
--

-- --------------------------------------------------------

--
-- Table structure for table `bsisrequests`
--

CREATE TABLE `bsisrequests` (
  `id` int(11) NOT NULL,
  `requestId` int(11) NOT NULL,
  `course` varchar(100) NOT NULL,
  `year` year(4) NOT NULL,
  `transacType` varchar(200) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `citrequests`
--

CREATE TABLE `citrequests` (
  `id` int(11) NOT NULL,
  `requestId` int(11) NOT NULL,
  `course` varchar(200) NOT NULL,
  `year` year(4) NOT NULL,
  `transacType` varchar(500) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `osarequests`
--

CREATE TABLE `osarequests` (
  `id` int(11) NOT NULL,
  `requestId` int(11) NOT NULL,
  `complainant` varchar(200) NOT NULL,
  `respondent` varchar(200) NOT NULL,
  `year` year(4) NOT NULL,
  `dateTime` datetime NOT NULL,
  `place` varchar(200) NOT NULL,
  `narration` varchar(2000) NOT NULL,
  `witnesses` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `osarequests`
--

INSERT INTO `osarequests` (`id`, `requestId`, `complainant`, `respondent`, `year`, `dateTime`, `place`, `narration`, `witnesses`) VALUES
(5, 12, 'Almark', 'Jeremy', 2022, '2022-10-13 15:48:00', 'Talisay', 'qwewqeqwe', ''),
(6, 13, 'Almark', 'Jeremy', 2022, '2022-10-13 15:53:00', 'Talisaya', 'sdadad', 'Ben Tong'),
(7, 14, 'Almark', 'Jeremy', 2022, '2022-10-13 15:54:00', 'Talisay', 'adasdasdasd', 'Almark Duma-op,Ben Tong');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `office` varchar(20) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `contact` varchar(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `requestDate` date NOT NULL DEFAULT current_timestamp(),
  `senderName` varchar(200) NOT NULL,
  `senderEmail` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `office`, `subject`, `contact`, `type`, `requestDate`, `senderName`, `senderEmail`) VALUES
(12, 'osa', 'asdasd', '09123456789', 'alumnus', '2022-10-13', 'Almark Duma-op', 'motch26@gmail.com'),
(13, 'osa', 'asdasd', '09123456789', 'alumnus', '2022-09-13', 'Almark Duma-op', 'motch26@gmail.com'),
(14, 'bsis', 'asdasd', '09123456789', 'alumnus', '2021-08-13', 'Almark Duma-op', 'motch26@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `userId` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `type`, `name`, `userId`) VALUES
('motch26@gmail.com', 'student', 'Almark Duma-op', '55555');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bsisrequests`
--
ALTER TABLE `bsisrequests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `citrequests`
--
ALTER TABLE `citrequests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `osarequests`
--
ALTER TABLE `osarequests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bsisrequests`
--
ALTER TABLE `bsisrequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `citrequests`
--
ALTER TABLE `citrequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `osarequests`
--
ALTER TABLE `osarequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
