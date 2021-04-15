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

$name1 = $_GET['Fname'];
$TableN = $_GET['tableN'];


// Perform Query
$sql = "SELECT Trial FROM $TableN WHERE Name='$name1'";
//$sql = "SELECT Trial FROM learnRandomWalkTable WHERE Name='$name1'";
//echo($sql);
$result = mysqli_query($conn,$sql);

//$result = mysql_query ("SELECT Trial FROM $TableN WHERE Name='$name1'")or die(mysql_error());//mysql_query("SELECT * FROM TryMapsTable2 WHERE Name='Shirley_Mark_map3'");//or die(mysql_error());
//echo mysqli_error();

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
//$sql1 = mysql_query ('SELECT * FROM $TableN WHERE Name=$name1')or die(mysql_error());
$myJSON1 = json_encode($resArr);
$myJSON2 = json_encode($rn);
echo($myJSON1);
$conn->close();
?>
