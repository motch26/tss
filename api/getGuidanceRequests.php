<?php
include('./includes/conn.php');
extract($_GET);

$query = $conn->query("SELECT * FROM guidancerequests WHERE office = '$office' ORDER BY requestDate DESC");
$rows = $query->fetchAll(PDO::FETCH_OBJ);

echo json_encode($rows);
