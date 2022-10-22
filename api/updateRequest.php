<?php
include("./includes/conn.php");
extract($_POST);

$update = $conn->exec("UPDATE requests SET status = '$updatedStatus', message = '$updatedMessage' WHERE id = $id");

echo $update;
