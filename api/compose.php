<?php
include('./includes/conn.php');
ini_set("display_errors", "On");
require_once "vendor/autoload.php";
extract($_POST);
$smtp_host = "smtp.gmail.com";
$smtp_port = 465;
$smtp_username = "tssmailer22@gmail.com";
$smtp_password = "lpszjsfwvvvwinzf";

function sendMail($email_from, $email_from_name, $to, $subject, $body)
{

  // Create the Transport
  global $smtp_host, $smtp_port, $smtp_username, $smtp_password;
  $transport = (new Swift_SmtpTransport($smtp_host, $smtp_port, 'ssl'))
    ->setUsername($smtp_username)
    ->setPassword($smtp_password);
  // Create the Mailer using your created Transport
  $mailer = new Swift_Mailer($transport);
  // Create a message

  $message = (new Swift_Message($subject))
    ->setFrom([$email_from => $email_from_name])
    // ->setTo(['receiver@domain.org', 'other@domain.org' => 'A name'])

    ->setTo($to)

    ->setBody($body, 'text/html');


  $result = $mailer->send($message);
}

$email = "
<h1>$subject</h1>
<hr/>
<h3>Subject: $subject</h3>
<h3>From: $senderName </h3>
<h3>Year & Section: $yearSection</h3>
<hr/>
 <h5>Login your account in the system to view request details.</h5>
";

$receivers = ["$officeEmail"];



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
    $insert2 = $conn->exec("INSERT INTO citrequests(requestId, course, year, yearLevel, section, transacType, message) VALUES($lastInsertId, '$course', '$year', '$yearLevel', '$section', '$transacType', '$message')");
    break;
  case "bsis":
    $insert2 = $conn->exec("INSERT INTO bsisrequests(requestId, course, year, yearLevel, section, transacType, message) VALUES($lastInsertId, '$course', '$year', '$yearLevel', '$section', '$transacType', '$message')");
    break;
  case "osa":
    $insert2 = $conn->exec("INSERT INTO osarequests(requestId, course yearLevel, section, complainant, respondent, year, dateTime, place, narration, witnesses) VALUES($lastInsertId, '$course', '$yearLevel', '$section' '$complainant', '$respondent', '$year', '$osaDateTime', '$place', '$narration', '$witnesses')");
    break;
  default:
    echo 0;
}


sendMail("tssmailer22@gmail.com", "TSS Mailer", $receivers, "TSS: $subject", $email);


echo $code;
