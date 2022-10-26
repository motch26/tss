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
$insert = $conn->exec("INSERT INTO requests(userId, office, subject, contact, code) VALUES ($userId, '$office', '$subject', '$contact', '$code')");
$lastInsertId = $conn->lastInsertId();

switch ($office) {
  case "cit":
    $insert2 = $conn->exec("INSERT INTO citrequests(requestId, course, year, transacType, message) VALUES($lastInsertId, '$course', '$year', '$transacType', '$message')");
    break;
  case "bsis":
    $insert2 = $conn->exec("INSERT INTO bsisrequests(requestId, course, year, transacType, message) VALUES($lastInsertId, '$course', '$year', '$transacType', '$message')");
    break;
  case "osa":
    $insert2 = $conn->exec("INSERT INTO osarequests(requestId, complainant, respondent, year, dateTime, place, narration, witnesses) VALUES($lastInsertId, '$complainant', '$respondent', '$year', '$osaDateTime', '$place', '$narration', '$witnesses')");
    break;
  default:
    echo 0;
}

$update = $conn->exec("INSERT INTO updates(requestId, action) VALUES($lastInsertId, '$action')");

echo $code;
