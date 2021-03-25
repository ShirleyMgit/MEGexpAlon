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

$Fname = stripslashes(htmlspecialchars($_POST['Fname']));
$num = stripslashes(htmlspecialchars($_POST['Num']));
$parS = stripslashes(htmlspecialchars($_POST['Nar']));
$TableN= stripslashes(htmlspecialchars($_POST['tableN']));   


$sql1 = mysqli_query ($conn,"UPDATE $TableN SET $parS = $num WHERE Name='$Fname'");
$sql2 = mysqli_query($conn,"INSERT IGNORE INTO $TableN (Name, $parS) VALUES ('$Fname', $num)");

$conn->close();
?>

