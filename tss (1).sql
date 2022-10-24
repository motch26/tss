-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2022 at 01:36 PM
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

--
-- Dumping data for table `citrequests`
--

INSERT INTO `citrequests` (`id`, `requestId`, `course`, `year`, `transacType`, `message`) VALUES
(10, 22, 'Sample', 2022, 'SAmpleasdsadad', 'adasdasd');

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

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `office` varchar(20) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `contact` varchar(11) NOT NULL,
  `requestDate` date NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `message` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `userId`, `code`, `office`, `subject`, `contact`, `requestDate`, `status`, `message`) VALUES
(22, 4, 'qrCRYQuy2LMSNzx4WFHT', 'cit', 'Sample', '09123456789', '2022-10-22', 'pending', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `picture` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `type`, `name`, `userId`, `picture`) VALUES
(4, 'motch26@gmail.com', 'student', 'Almark Duma-op', '20202020', 'https://lh3.googleusercontent.com/a/ALm5wu3dXlXPYnXy5iF6PQq4odtFejIFNa8DDfs8OEvukg=s96-c'),
(5, 'dumaop.almark2a@gmail.com', 'student', 'Almark Duma-op', '20202021', 'https://lh3.googleusercontent.com/a/ALm5wu1L4bVmJSHGJAnPirvI4_ADlE_8PUj_eqmgoBK6=s96-c');

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
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bsisrequests`
--
ALTER TABLE `bsisrequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `citrequests`
--
ALTER TABLE `citrequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `osarequests`
--
ALTER TABLE `osarequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
