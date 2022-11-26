<?php
include('./includes/conn.php');

$rows = [];
if (isset($_GET['office'])) {
  if ($_GET['office'] === "guidance") {
    if (isset($_GET['schedule'])) {
      $query = $conn->query("SELECT * FROM guidancerequests WHERE schedule IS NOT NULL ORDER BY requestDate DESC");
      $rows = $query->fetchAll(PDO::FETCH_OBJ);
    } else {

      $query = $conn->query("SELECT * FROM guidancerequests WHERE schedule IS NULL ORDER BY requestDate DESC");
      $rows = $query->fetchAll(PDO::FETCH_OBJ);
    }
  } else {
    if (isset($_GET['schedule'])) {
      extract($_GET);
      $query = $conn->query("SELECT r.*, u.name FROM requests r INNER JOIN  users u ON r.userId = u.id WHERE office = '$office' AND  status = 'approved' AND scheduleDate > current_timestamp() ORDER BY r.scheduleDate DESC");
      $rows = $query->fetchAll(PDO::FETCH_OBJ);
    } else {

      extract($_GET);
      $query = $conn->query("SELECT * FROM requests WHERE office = '$office' AND  status = 'pending'");
      $rows = $query->fetchAll(PDO::FETCH_OBJ);
    }
  }
} else {

  if (isset($_GET['currentId'])) {
    extract($_GET);
    $query = $conn->query("SELECT * FROM requests WHERE userId = $currentId  ORDER BY requestDate DESC");
    $rows = $query->fetchAll(PDO::FETCH_OBJ);
  }
}

echo json_encode($rows);
