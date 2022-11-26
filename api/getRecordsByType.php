<?php
include('./includes/conn.php');
extract($_GET);
$rows = [];
$query = $conn->query("SELECT MONTH(requestDate) MONTH, COUNT(*) COUNT
FROM requests
INNER JOIN users ON users.id = requests.userId
WHERE YEAR(requestDate)=2022 AND users.type = 'student' AND office = '$office'
GROUP BY MONTH(requestDate);
");
$students = $query->fetchAll(PDO::FETCH_OBJ);

$query = $conn->query("SELECT MONTH(requestDate) MONTH, COUNT(*) COUNT
FROM requests
INNER JOIN users ON users.id = requests.userId
WHERE YEAR(requestDate)=2022 AND users.type = 'alumnus' AND office = '$office'
GROUP BY MONTH(requestDate);
");
$alumni = $query->fetchAll(PDO::FETCH_OBJ);

$query = $conn->query("SELECT MONTH(requestDate) MONTH, COUNT(*) COUNT
FROM requests
INNER JOIN users ON users.id = requests.userId
WHERE YEAR(requestDate)=2022 AND users.type = 'visitor' AND office = '$office'
GROUP BY MONTH(requestDate);
");
$visitors = $query->fetchAll(PDO::FETCH_OBJ);

array_push($rows, $students, $alumni, $visitors);
echo json_encode($rows);
