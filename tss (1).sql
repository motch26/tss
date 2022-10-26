-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2022 at 01:19 PM
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

--
-- Dumping data for table `bsisrequests`
--

INSERT INTO `bsisrequests` (`id`, `requestId`, `course`, `year`, `transacType`, `message`) VALUES
(5, 23, 'New Sample', 2022, 'New Sample', 'New Sample Message'),
(6, 25, 'Sample 4', 2022, 'Sample 4', 'Sample 4 Message'),
(7, 31, 'Email', 2022, 'Email', 'Email'),
(8, 32, 'EMAIL 3', 2022, 'EMAIL 3', 'EMAIL 3');

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
(10, 22, 'Sample', 2022, 'SAmpleasdsadad', 'adasdasd'),
(11, 24, 'Sample', 2022, 'asdad', 'Sample 3 Message'),
(12, 26, 'Sample 5', 2022, 'Sample 5', 'Sample 5 Sample 5 Sample 5'),
(13, 27, 'PPPPPP', 2022, 'asdasdasd', 'adadasd'),
(14, 28, 'Action', 2022, 'Action', 'Action Message'),
(15, 30, 'EMAIL', 2022, 'EMAIL', 'EMAIL'),
(16, 33, 'aaa', 2022, 'aaaa', 'aaaa');

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
(8, 29, 'OSA SAMPLE', 'OSA SAMPLE', 2022, '2022-10-26 17:49:00', 'OSA SAMPLE', 'OSA SAMPLE', 'Sample 1,Sample 2,Sample 3');

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
  `message` varchar(2000) NOT NULL,
  `scheduleDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `userId`, `code`, `office`, `subject`, `contact`, `requestDate`, `status`, `message`, `scheduleDate`) VALUES
(22, 4, 'qrCRYQuy2LMSNzx4WFHT', 'cit', 'Sample', '09123456789', '2022-10-22', 'approved', 'qweqweqwe', '2022-10-25 06:16:27'),
(23, 4, 'UTu9z0gG9wugpnJvv6l1', 'bsis', 'New Sample', '09123456789', '2022-10-25', 'rejected', 'Declined BSIS', '2022-10-26 05:45:10'),
(24, 4, 'U8jkrRM7zmiG0rvXZu3Y', 'cit', 'Sample 3', '09123456789', '2022-10-25', 'approved', 'Schedule chuchuchuhcu', '2022-10-26 07:03:00'),
(25, 4, 'lj0EKNS90Y6qWhKhF59d', 'bsis', 'SAmple 4', '09123456789', '2022-10-25', 'approved', 'BSIS Approved', '2022-10-26 05:45:25'),
(26, 5, 'ASdoTv5qGWlLwJq6JH9q', 'cit', 'Sample 5', '09123456789', '2022-10-25', 'approved', 'Transaction Approved!', '2022-10-25 07:05:44'),
(27, 4, 'XRfcpXlGhCvkWlDMGEI8', 'cit', 'PPPPPP', '09123456789', '2022-10-26', 'rejected', 'Reject Message', '2022-10-26 04:04:56'),
(28, 4, 'dAQyDVv6h64EYjeM2mMj', 'cit', 'Action', '09123456789', '2022-10-26', 'approved', 'Action Response', '2022-10-27 04:58:56'),
(29, 4, 'GKOA2Djzfm7sKeuyDiBK', 'osa', 'OSA SAMPLE', '09123456789', '2022-10-26', 'approved', 'OSA APPROVED', '2022-10-26 05:51:47'),
(30, 4, 'Jn8wzFlDjSN9WnnHWbuA', 'cit', 'EMAIL', '09123456789', '2022-10-26', 'pending', '', NULL),
(31, 4, 'SLSEh64Gbq22O8elVMwY', 'bsis', 'Email', 'Email', '2022-10-26', 'pending', '', NULL),
(32, 4, 'DfdWlLY7B53WKMimLPF3', 'bsis', 'EMAIL 3', '09123456789', '2022-10-26', 'pending', '', NULL),
(33, 4, '2b3vEBSW3ByVlnp9lUL1', 'cit', 'aaa', '09123456789', '2022-10-26', 'pending', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `updates`
--

CREATE TABLE `updates` (
  `id` int(11) NOT NULL,
  `requestId` int(11) NOT NULL,
  `action` varchar(200) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `updates`
--

INSERT INTO `updates` (`id`, `requestId`, `action`, `timestamp`) VALUES
(1, 28, 'new', '2022-10-26 16:21:16'),
(2, 28, 'approved', '2022-10-26 17:02:33'),
(3, 23, 'rejected', '2022-10-26 17:45:22'),
(4, 25, 'approved', '2022-10-26 17:45:32'),
(5, 29, 'new', '2022-10-26 17:49:51'),
(6, 29, 'approved', '2022-10-26 17:52:01'),
(7, 30, 'new', '2022-10-26 18:52:01'),
(8, 31, 'new', '2022-10-26 18:58:14'),
(9, 32, 'new', '2022-10-26 19:00:24'),
(10, 33, 'new', '2022-10-26 19:11:15');

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
-- Indexes for table `updates`
--
ALTER TABLE `updates`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `citrequests`
--
ALTER TABLE `citrequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `osarequests`
--
ALTER TABLE `osarequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `updates`
--
ALTER TABLE `updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
