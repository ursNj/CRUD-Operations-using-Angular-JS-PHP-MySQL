<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
include("db.php");

$res = mysql_query("SELECT * from users where 1 order by id desc");

// echo '{"users":';
$everything = array();
$i = 0;

while($row = mysql_fetch_assoc($res)) {
	
$everything[$i]['id'] = $row['id'];		
$everything[$i]['name'] = $row['name'];
$everything[$i]['email'] = $row['email'];
$everything[$i]['phone'] = $row['phone'];

$i++;

}

echo json_encode($everything);

// echo '}';
?>