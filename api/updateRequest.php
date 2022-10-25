<?php
include("./includes/conn.php");
extract($_POST);

$update = $conn->exec("UPDATE requests SET status = '$updatedStatus', message = '$updatedMessage', scheduleDate = '$updatedDateTime' WHERE id = $id");

echo $update;
