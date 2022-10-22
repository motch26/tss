<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
date_default_timezone_set('Asia/Manila');
$user = 'root';
$pass = '';
$servername = 'localhost';
$dbname = 'tss';
$conn = new PDO('mysql:host=' . $servername . ';dbname=' . $dbname, $user, $pass);
