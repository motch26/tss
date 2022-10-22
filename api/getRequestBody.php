<?php
include('./includes/conn.php');
extract($_GET);
$row = [];


switch ($office) {
  case "osa":
    $query = $conn->query("SELECT * FROM osarequests WHERE requestId = $id");
    $row = $query->fetch(PDO::FETCH_OBJ);
    break;
  case "cit":
    $query = $conn->query("SELECT * FROM citrequests WHERE requestId = $id");
    $row = $query->fetch(PDO::FETCH_OBJ);
    break;
  case "bsis":
    $query = $conn->query("SELECT * FROM bsisrequests WHERE requestId = $id");
    $row = $query->fetch(PDO::FETCH_OBJ);
    break;
  default:
    echo json_encode($row);
}

echo json_encode($row);
