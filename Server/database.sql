SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `adresses` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Street` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `City` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ZIP` int(11) NOT NULL,
  `Additional` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `doors` (
  `ID` int(11) NOT NULL,
  `Name` char(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Short description',
  `FullName` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Price` mediumint(9) NOT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ImagePath` tinytext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `doors` (`ID`, `Name`, `FullName`, `Price`, `Description`, `ImagePath`) VALUES
(12, 'ddddddd', 'test', 123, 'beschreibung', 'ordner/date.endung');

CREATE TABLE `paymethods` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Type` enum('Paypal','Bank','Bitcoin','Bill','') COLLATE utf8mb4_unicode_ci NOT NULL,
  `Data` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'JSON'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `purchases` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `PaymentID` int(11) NOT NULL,
  `AdressID` int(11) NOT NULL,
  `Data` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'JSON (Products, Costs)',
  `Time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `purchases` (`ID`, `UserID`, `PaymentID`, `AdressID`, `Data`, `Time`) VALUES
(1, 0, -1, -1, '', '2018-01-06 21:47:47');

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FirstName` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `LastName` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Hashed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`ID`, `Username`, `Email`, `FirstName`, `LastName`, `Password`) VALUES
(1, 'alexboy', 'alex@roidl.de', 'Alexander', 'Roidl', 'c137'),
(2, 'test', '', '', '', 'lol'),
(3, 'alex', '', '', '', 'test');


ALTER TABLE `adresses`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

ALTER TABLE `doors`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `paymethods`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

ALTER TABLE `purchases`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `AdressID` (`AdressID`),
  ADD KEY `PaymentID` (`PaymentID`),
  ADD KEY `UserID` (`UserID`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);


ALTER TABLE `adresses`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `doors`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `paymethods`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `purchases`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
