<?php
include('./includes/conn.php');
extract($_POST);
$currentId = '';

$search = $conn->query("SELECT * FROM users WHERE email = '$email' AND type = '$type'");
$isExisting = $search->rowCount();

if ($isExisting === 0) {
  $exec = $conn->exec("INSERT INTO users (email, type, name, userId, picture) VALUES('$email', '$type', '$name', '$userId', '$picture')");
  $currentId = $conn->lastInsertId();
} else {
  $currentUser = $search->fetch(PDO::FETCH_NUM);
  $currentId = $currentUser[0];
}

echo $currentId;
