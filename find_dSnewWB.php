<?php

// this path should point to your configuration file:
include('newDataBaseConnectMine.php');

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully ";

mysqli_select_db($conn,"smark");

// Perform Query
$sql = "SELECT dS FROM $TableN WHERE Name='$name1'";
$result = mysqli_query ($conn,$sql);//mysql_query("SELECT * FROM TryMapsTable2 WHERE Name='Shirley_Mark_map3'");//or die(mysql_error());

if($result){
	$resArr = array();
    $rn=0;
   while($info = mysqli_fetch_array( $result )) {
	   $resArr[$rn] =$info;
	   $rn=$rn+1;
   }
}else{
	$rn=-1;
	$resArr=-1;
}

$myJSON1 = json_encode($resArr);
$myJSON2 = json_encode($rn);
echo($myJSON1);

$conn->close();
?>