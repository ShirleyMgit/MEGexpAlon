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

// Perform Query

$subjectId = stripslashes(htmlspecialchars($_POST['subjectId']));
$imgFileName = stripslashes(htmlspecialchars($_POST['imgFileName']));
$nodeNumber = stripslashes(htmlspecialchars($_POST['nodeNumber']));

echo strcmp($nodeNumber,"node1");
if (strcmp($nodeNumber,"node1")==0){ //insert new row with participant's name (in php strcmp returns 0 for equality)
  $sql1 = mysqli_query($conn,"INSERT INTO imagesFilesTable (subjectId) VALUES ('$subjectId')");
  echo "wrote subjectId";
}
$sql2 = mysqli_query ($conn,"UPDATE imagesFilesTable SET $nodeNumber = $imgFileName WHERE subjectId='$subjectId'");

$conn->close();
?>
