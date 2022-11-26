<?php
include('./includes/conn.php');
extract($_POST);
$ch = curl_init();
$parameters = array(
  'apikey' => '231a374fe8f243b86ad77f1a230b8764', //Your API KEY
  'number' => $number,
  'message' => $message,
  'sendername' => 'SEMAPHORE'
);
curl_setopt($ch, CURLOPT_URL, 'https://semaphore.co/api/v4/messages');
curl_setopt($ch, CURLOPT_POST, 1);

//Send the parameters set above with the request
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($parameters));

// Receive response from server
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$output = curl_exec($ch);
curl_close($ch);

//Show the server response
echo $output;
