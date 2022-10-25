<?php
include("./includes/conn.php");
extract($_GET);
$row = [];
$query = $conn->query("SELECT * FROM  users WHERE id = $id");
$row = $query->fetch(PDO::FETCH_OBJ);

echo json_encode($row);
