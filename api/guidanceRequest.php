<?php
include('./includes/conn.php');
extract($_POST);

$insert = $conn->exec("INSERT INTO guidancerequests (office, studentName, section, message) VALUES('$office', '$studentName', '$section', '$message')");

echo $insert;
