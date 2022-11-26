<?php
include('./includes/conn.php');
extract($_POST);
function generateRandomString()
{
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < 20; $i++) {
    $randomString .= $characters[rand(0, $charactersLength - 1)];
  }
  return $randomString;
}
$code = generateRandomString();
$insert = $conn->exec("INSERT INTO guidancerequests (code, office, studentName, section, message) VALUES('$code', '$office', '$studentName', '$section', '$message')");

echo $insert;
