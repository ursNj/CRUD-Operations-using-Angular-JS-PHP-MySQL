<?php
include('db.php');
error_reporting(1);
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
 
$sql = "INSERT INTO `users` (`id`, `name`, `email`, `phone`) VALUES (NULL, '$name', '$email', '$phone')";
 
 if(mysql_query($sql)){
	echo "1";
 } else {
 }

 ?>