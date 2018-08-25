<?php
include("db.php");
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
 
$res = mysql_query("UPDATE  `users` SET  `name` =  '$name', `email` =  '$email', `phone` =  '$phone' WHERE `id` ='$id'");
$total = mysql_affected_rows();
if($total > 0) {
	echo "1";
} else {
}

?>