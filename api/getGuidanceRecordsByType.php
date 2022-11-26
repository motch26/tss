<?php
include('./includes/conn.php');
extract($_GET);
$rows = [];
$query = $conn->query("SELECT MONTH(requestDate) MONTH, COUNT(*) COUNT
FROM guidancerequests
WHERE YEAR(requestDate)=2022 AND office = 'cit'
GROUP BY MONTH(requestDate);
");
$cit = $query->fetchAll(PDO::FETCH_OBJ);

$query = $conn->query("SELECT MONTH(requestDate) MONTH, COUNT(*) COUNT
FROM guidancerequests
WHERE YEAR(requestDate)=2022 AND office = 'bsis'
GROUP BY MONTH(requestDate);
");
$bsis = $query->fetchAll(PDO::FETCH_OBJ);

$query = $conn->query("SELECT MONTH(requestDate) MONTH, COUNT(*) COUNT
FROM guidancerequests
WHERE YEAR(requestDate)=2022 AND office = 'osa'
GROUP BY MONTH(requestDate);
");
$osa = $query->fetchAll(PDO::FETCH_OBJ);

array_push($rows, $cit, $bsis, $osa);
echo json_encode($rows);
