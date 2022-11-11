<?php
include('./includes/conn.php');

$rows = [];
$query = $conn->query("SELECT MONTH(requestDate) MONTH, COUNT(*) COUNT
FROM requests
INNER JOIN users ON users.id = requests.userId
WHERE YEAR(requestDate)=2022 AND users.type = 'student'
GROUP BY MONTH(requestDate);
");
$students = $query->fetchAll(PDO::FETCH_OBJ);

$query = $conn->query("SELECT MONTH(requestDate) MONTH, COUNT(*) COUNT
FROM requests
INNER JOIN users ON users.id = requests.userId
WHERE YEAR(requestDate)=2022 AND users.type = 'alumnus'
GROUP BY MONTH(requestDate);
");
$alumni = $query->fetchAll(PDO::FETCH_OBJ);

$query = $conn->query("SELECT MONTH(requestDate) MONTH, COUNT(*) COUNT
FROM requests
INNER JOIN users ON users.id = requests.userId
WHERE YEAR(requestDate)=2022 AND users.type = 'visitor'
GROUP BY MONTH(requestDate);
");
$visitors = $query->fetchAll(PDO::FETCH_OBJ);

array_push($rows, $students, $alumni, $visitors);
echo json_encode($rows);
