-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2022 at 01:16 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

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
  `yearLevel` varchar(2) NOT NULL,
  `section` varchar(50) NOT NULL,
  `year` year(4) NOT NULL,
  `transacType` varchar(200) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bsisrequests`
--

INSERT INTO `bsisrequests` (`id`, `requestId`, `course`, `yearLevel`, `section`, `year`, `transacType`, `message`) VALUES
(5, 23, 'New Sample', '3', 'A', 2022, 'New Sample', 'New Sample Message'),
(6, 25, 'Sample 4', '4', 'A', 2022, 'Sample 4', 'Sample 4 Message'),
(7, 31, 'Email', '4', 'A', 2022, 'Email', 'Email'),
(8, 32, 'EMAIL 3', '2', 'A', 2022, 'EMAIL 3', 'EMAIL 3'),
(9, 42, 'BSIS', '3', 'A', 2022, 'Grades', 'jyyuuyiyuiyu');

-- --------------------------------------------------------

--
-- Table structure for table `citrequests`
--

CREATE TABLE `citrequests` (
  `id` int(11) NOT NULL,
  `requestId` int(11) NOT NULL,
  `course` varchar(200) NOT NULL,
  `yearLevel` varchar(2) NOT NULL,
  `section` varchar(50) NOT NULL,
  `year` year(4) NOT NULL,
  `transacType` varchar(500) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `citrequests`
--

INSERT INTO `citrequests` (`id`, `requestId`, `course`, `yearLevel`, `section`, `year`, `transacType`, `message`) VALUES
(10, 22, 'Sample', '1', 'A', 2022, 'SAmpleasdsadad', 'adasdasd'),
(11, 24, 'Sample', '2', 'A', 2022, 'asdad', 'Sample 3 Message'),
(12, 26, 'Sample 5', '2', 'A', 2022, 'Sample 5', 'Sample 5 Sample 5 Sample 5'),
(13, 27, 'PPPPPP', '3', 'A', 2022, 'asdasdasd', 'adadasd'),
(14, 28, 'Action', '4', 'A', 2022, 'Action', 'Action Message'),
(15, 30, 'EMAIL', '4', 'A', 2022, 'EMAIL', 'EMAIL'),
(16, 33, 'aaa', '4', 'A', 2022, 'aaaa', 'aaaa'),
(17, 35, 'Chuchu', '1', 'A', 0000, 'Chuchu', 'Sample message'),
(18, 36, 'BSIS ', '2', 'A', 2022, 'Chuchu', 'asdadasdasd'),
(19, 39, 'BSIS', '4', 'A', 2022, 'Inquire Services', 'dsfsdfsf'),
(20, 40, 'BSIS', '4', 'A', 2022, 'Complaints', 'dffdfgdfgdfg'),
(21, 41, 'BSIS', '3', 'B', 2022, 'Dropped Subjects', 'dfgdfgdgdf'),
(22, 43, 'BSIS', '', '', 2022, 'Dropped Subjects', 'Semaphore'),
(23, 44, 'BSIS', '2', 'A', 2022, 'Retrieval of Forms', 'Check');

-- --------------------------------------------------------

--
-- Table structure for table `guidancerequests`
--

CREATE TABLE `guidancerequests` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `office` varchar(50) NOT NULL,
  `studentName` varchar(100) NOT NULL,
  `section` varchar(50) NOT NULL,
  `message` varchar(2000) NOT NULL,
  `schedule` datetime DEFAULT NULL,
  `requestDate` datetime NOT NULL DEFAULT current_timestamp(),
  `updateMessage` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guidancerequests`
--

INSERT INTO `guidancerequests` (`id`, `code`, `office`, `studentName`, `section`, `message`, `schedule`, `requestDate`, `updateMessage`) VALUES
(3, 'AiuJK1JRKD0lusAL96pF', 'cit', 'Sample Student', 'BSIS 3B', 'asdasdasdas', '2022-11-16 05:16:21', '2022-11-13 14:48:44', 'ssss'),
(4, 'etRQ5veovEsA68oJWThS', 'osa', 'Ben Ben', 'BSIS 4-A', 'From OSA', '2022-11-20 02:59:00', '2022-11-17 14:58:58', 'asdasd');

-- --------------------------------------------------------

--
-- Table structure for table `osarequests`
--

CREATE TABLE `osarequests` (
  `id` int(11) NOT NULL,
  `course` varchar(100) NOT NULL,
  `yearLevel` varchar(2) NOT NULL,
  `section` varchar(50) NOT NULL,
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

INSERT INTO `osarequests` (`id`, `course`, `yearLevel`, `section`, `requestId`, `complainant`, `respondent`, `year`, `dateTime`, `place`, `narration`, `witnesses`) VALUES
(8, '', '3', 'A', 29, 'OSA SAMPLE', 'OSA SAMPLE', 2022, '2022-10-26 17:49:00', 'OSA SAMPLE', 'OSA SAMPLE', 'Sample 1,Sample 2,Sample 3'),
(9, '', '2', 'A', 34, 'Ben Tong', 'Ben and Ben', 2022, '2022-10-12 10:00:00', 'Talisay Campus', 'Sample narration chuchu....', 'Almark Duma-op,Moira Dela Torre');

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
(30, 4, 'Jn8wzFlDjSN9WnnHWbuA', 'cit', 'EMAIL', '09123456789', '2022-10-26', 'approved', 'sadadasdsdf', '2022-11-17 01:08:32'),
(31, 4, 'SLSEh64Gbq22O8elVMwY', 'bsis', 'Email', 'Email', '2022-10-26', 'approved', 'asdadasdad', '2022-11-17 01:14:35'),
(32, 4, 'DfdWlLY7B53WKMimLPF3', 'bsis', 'EMAIL 3', '09064614157', '2022-10-26', 'approved', 'SAMPLE', '2022-11-17 01:14:35'),
(33, 4, '2b3vEBSW3ByVlnp9lUL1', 'cit', 'aaa', '09123456789', '2022-10-26', 'approved', 'asdasdad', '2022-11-18 01:10:00'),
(34, 4, '1iGiLnBNB72AS6GhNyRn', 'osa', 'OSA SAMPLE REQUEST', '09517687593', '2022-10-26', 'approved', 'Please chukchuk chakchak...', '2022-10-28 09:00:00'),
(35, 6, 'J19buxtoW6GxNzGSHMSO', 'cit', 'VIsitor Chuchu', '09064614157', '2022-10-26', 'approved', 'Chuchu', '2022-11-21 01:11:00'),
(36, 4, 'hB7a31qieuDYtgZrpuQ9', 'cit', 'AAAA OSA SAMPLE REQUEST', '09517687593', '2022-11-15', 'approved', 'asdasdasd', '2022-11-20 06:23:00'),
(39, 4, 'iHAx5ffHi5lBHF35arbE', 'cit', 'aaaa', '09517687593', '2022-11-16', 'approved', 'Semaphore', '2022-11-17 09:58:45'),
(40, 4, 'v23tywHoBMf4rAVyQKzA', 'cit', 'With Email', '09064614157', '2022-11-16', 'approved', 'Semaphore', '2022-11-17 09:58:45'),
(41, 4, 'vywQOLIhn5JW4GEQ69Iy', 'cit', 'With Email 2', '09064614157', '2022-11-16', 'approved', 'asdasdsd', '2022-11-17 12:58:07'),
(42, 4, 'Q4KDQQXCGwrAdNYaOhEj', 'bsis', 'New Email', '09064614157', '2022-11-16', 'approved', 'Approved!', '2022-11-17 01:14:35'),
(43, 7, 'XLkXWbuBJ1mAdadL91TL', 'cit', 'Semaphore', '09064614157', '2022-11-17', 'approved', 'Semaphore New', '2022-11-17 01:23:41'),
(44, 4, 'fwSt2ZJbioERJDaZqMpx', 'cit', 'Check', '09064614157', '2022-11-17', 'approved', 'Check', '2022-11-17 01:44:16');

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
(10, 33, 'new', '2022-10-26 19:11:15'),
(11, 34, 'new', '2022-10-26 22:12:31'),
(12, 34, 'approved', '2022-10-26 22:21:21'),
(13, 35, 'new', '2022-10-26 22:40:41'),
(14, 36, 'new', '2022-11-15 23:36:04'),
(15, 3, 'approved', '2022-11-16 04:56:53'),
(16, 3, 'approved', '2022-11-16 05:08:10'),
(17, 3, 'approved', '2022-11-16 05:10:36'),
(18, 3, 'approved', '2022-11-16 05:13:09'),
(19, 3, 'approved', '2022-11-16 05:13:36'),
(20, 3, 'approved', '2022-11-16 05:16:28'),
(21, 3, 'approved', '2022-11-16 05:17:37'),
(22, 3, 'approved', '2022-11-16 05:20:10'),
(23, 3, 'approved', '2022-11-16 05:21:05'),
(24, 36, 'approved', '2022-11-16 06:24:00'),
(25, 39, 'new', '2022-11-16 08:28:58'),
(26, 40, 'new', '2022-11-16 08:40:37'),
(27, 41, 'new', '2022-11-16 08:42:09'),
(28, 42, 'new', '2022-11-16 08:49:29'),
(29, 39, 'approved', '2022-11-17 09:59:05'),
(30, 40, 'approved', '2022-11-17 10:01:12'),
(31, 41, 'approved', '2022-11-17 10:27:04'),
(32, 41, 'approved', '2022-11-17 12:58:20'),
(33, 30, 'approved', '2022-11-17 13:08:43'),
(34, 33, 'approved', '2022-11-17 13:10:22'),
(35, 35, 'approved', '2022-11-17 13:12:34'),
(36, 42, 'approved', '2022-11-17 13:14:49'),
(37, 31, 'approved', '2022-11-17 13:15:57'),
(38, 32, 'approved', '2022-11-17 13:16:35'),
(39, 43, 'new', '2022-11-17 13:19:26'),
(40, 43, 'approved', '2022-11-17 13:20:21'),
(41, 43, 'approved', '2022-11-17 13:23:54'),
(42, 44, 'new', '2022-11-17 13:42:58'),
(43, 44, 'approved', '2022-11-17 13:44:24');

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
(5, 'dumaop.almark2a@gmail.com', 'student', 'Almark Duma-op', '20202021', 'https://lh3.googleusercontent.com/a/ALm5wu1L4bVmJSHGJAnPirvI4_ADlE_8PUj_eqmgoBK6=s96-c'),
(6, 'motch26@gmail.com', 'visitor', 'Almark Duma-op', 'Ben Tong', 'https://lh3.googleusercontent.com/a/ALm5wu3dXlXPYnXy5iF6PQq4odtFejIFNa8DDfs8OEvukg=s96-c'),
(7, 'motch26@gmail.com', 'alumnus', 'Almark Duma-op', '21312312312', 'https://lh3.googleusercontent.com/a/ALm5wu3dXlXPYnXy5iF6PQq4odtFejIFNa8DDfs8OEvukg=s96-c');

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
-- Indexes for table `guidancerequests`
--
ALTER TABLE `guidancerequests`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `citrequests`
--
ALTER TABLE `citrequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `guidancerequests`
--
ALTER TABLE `guidancerequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `osarequests`
--
ALTER TABLE `osarequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `updates`
--
ALTER TABLE `updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
