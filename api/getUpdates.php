<?php
include('./includes/conn.php');
extract($_GET);

$query = $conn->query("SELECT * FROM updates u INNER JOIN requests r ON u.requestId = r.id WHERE r.userId = $id ORDER BY timestamp DESC");
$rows = $query->fetchAll(PDO::FETCH_OBJ);

echo json_encode($rows);
