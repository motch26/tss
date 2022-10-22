<?php
include('./includes/conn.php');

$rows = [];

if (isset($_GET['currentId'])) {
  extract($_GET);
  $query = $conn->query("SELECT * FROM requests WHERE userId = $currentId  ORDER BY requestDate DESC");
  $rows = $query->fetchAll(PDO::FETCH_OBJ);
}
if (isset($_GET['office'])) {
  extract($_GET);
  $query = $conn->query("SELECT * FROM requests WHERE office = '$office' AND  status = 'pending'");
  $rows = $query->fetchAll(PDO::FETCH_OBJ);
}

echo json_encode($rows);
