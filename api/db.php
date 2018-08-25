<?php 
require_once 'Config.php';
// include("functions.php");
$conn=mysql_connect($db_host,$db_user,$db_password);
// if($conn)
	//echo "ok";
mysql_select_db($database,$conn);
?>