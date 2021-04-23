<?php

// this path should point to your configuration file:
include('dbConnectConfig.php');

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully ";

mysqli_select_db($conn,"alonbara_meg");
//input:
$subjectId = $_GET['q']; 

$sql = "SELECT * FROM imagesFilesTable WHERE subjectId = '$subjectId'";

$result = mysqli_query($conn,$sql);

if($result){
	$resArr = array();
    $rn=0;
   while($info = mysqli_fetch_array( $result,MYSQLI_NUM)) {
	   $resArr[$rn] =$info;
	   $rn=$rn+1;
   }
}else{
	$resArr=-1;
}
$myJSON1 = json_encode($resArr);
$myJSON2 = json_encode($rn);
echo($myJSON1);

$conn->close();
?>
