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

mysqli_select_db($conn,"alonbara_meg");
//input:
$name1 = $_GET['q'];

$sql = "SELECT * FROM picturesNumberMEG WHERE Name = '$name1'";

$result = mysqli_query($conn,$sql);
//$result = $conn->query($sql);

//echo $result->num_rows;
//echo "done result \n";

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
//$sql1 = mysql_query ('SELECT * FROM $TableN WHERE Name=$name1')or die(mysql_error());
$myJSON1 = json_encode($resArr);
$myJSON2 = json_encode($rn);
echo($myJSON1);
/* if($result->num_rows > 0){
	// output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row;
    }
} else {
	$row = -1;
    echo $row;
} */
//echo $row;
$conn->close();
?>
