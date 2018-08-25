<?php
 include('db.php');
 error_reporting(0);
 $id = $_REQUEST['id'];
 if($id != '') {
 $sql0 = mysql_query("DELETE FROM `users` WHERE `id` = '$id'");
 $num = mysql_num_rows($sql0);
 if($num > 0) {
	 echo "1";
 }
 }
 
 ?>