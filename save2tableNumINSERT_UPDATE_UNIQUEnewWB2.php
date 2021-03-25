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

$Fname = $_GET['Fname'];
$num = $_GET['Num'];
$parS =$_GET['Nar'];
$TableN = $_GET['tableN'];


$sql1 = mysqli_query ($conn,"UPDATE $TableN SET $parS = $num WHERE Name='$Fname'");
$sql2 = mysqli_query($conn,"INSERT IGNORE INTO $TableN (Name, $parS) VALUES ('$Fname', $num)");

$conn->close();
?>

