<?php
ini_set("display_errors", "On");
require_once "vendor/autoload.php";

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

$email = "<h3>Sample MAil</h3>";

$receivers = ["almark.duma-op@chmsu.edu.ph"];

sendMail("tssmailer22@gmail.com", "TSS Mailer", $receivers, "System Notification", $email);
