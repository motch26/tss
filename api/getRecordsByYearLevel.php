<?php
include('./includes/conn.php');
extract($_GET);
$officeTB = "";
$rows = [];
switch ($office) {
  case "cit":
    $officeTB = "citrequests";
    break;
  case "bsis":
    $officeTB = "bsisrequests";
    break;
  case "osa":
    $officeTB = "osarequests";
    break;
  default:
    echo false;
}
$query = $conn->query("SELECT COUNT(*) count, yearLevel FROM $officeTB GROUP BY yearLevel ORDER BY yearLevel");
$rows = $query->fetchAll(PDO::FETCH_OBJ);

echo json_encode($rows);
