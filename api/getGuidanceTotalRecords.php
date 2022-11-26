<?php
include("./includes/conn.php");
extract($_GET);

$query = $conn->query("SELECT COUNT(*) count, office FROM guidancerequests GROUP BY office");
$rows = $query->fetchAll(PDO::FETCH_OBJ);

echo json_encode($rows);
