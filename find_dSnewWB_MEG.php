<?php

// this path should point to your configuration file:
include('dbConnectConfig.php');

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully ";

mysqli_select_db($conn,"alonbara_meg");

$name1 = $_GET['Fname'];
$TableN = $_GET['tableN'];

// Perform Query
$sql = "SELECT dS FROM $TableN WHERE Name='$name1'";
$result = mysqli_query ($conn,$sql);
//echo $sql;
if($result){
	$resArr = array();
    $rn=0;
   while($info = mysqli_fetch_array($result,MYSQLI_NUM)) {
	   $resArr[$rn] =$info;
	  // 	echo $rn;
		//echo $info;
	   $rn=$rn+1;
   }
}else{
	$rn=-1;
	$resArr=-1;
}

$myJSON1 = json_encode($resArr);
//$myJSON2 = json_encode($rn);
//echo "now json: ";
echo($myJSON1);

$conn->close();
?>
