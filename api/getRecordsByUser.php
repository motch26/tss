<?php
include("./includes/conn.php");
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
$query = $conn->query("SELECT COUNT(*) count, users.type FROM $officeTB cit INNER JOIN requests ON requests.id = cit.requestId INNER JOIN users ON users.id = requests.userId GROUP BY users.type ORDER BY users.type");
$rows = $query->fetchAll(PDO::FETCH_OBJ);

echo json_encode($rows);
