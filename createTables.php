<?php
// Only need to run this once. Can also create tables in phpMyAdmin, I'm jus
// loging here which tables are created, how they are called and which columns they have

// this path should point to your configuration file:
include('dbConnectConfig.php');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// sql to create table imagesFilesTable
$sql = "CREATE TABLE imagesFilesTable (
subjectId TEXT,
node1 INT,
node2 INT,
node3 INT,
node4 INT,
node5 INT,
node6 INT,
node7 INT,
node8 INT,
node9 INT,
node10 INT,
node11 INT,
node12 INT,
node13 INT,
node14 INT,
node15 INT,
node16 INT,
node17 INT,
node18 INT,
node19 INT,
node20 INT,
node21 INT,
node22 INT,
node23 INT,
node24 INT,
node25 INT,
node26 INT,
node27 INT,
node28 INT,
node29 INT,
node30 INT,
node31 INT,
node32 INT,
node33 INT,
node34 INT,
node35 INT,
node36 INT,
node37 INT,
node38 INT,
node39 INT,
node40 INT,
node41 INT,
node42 INT,
node43 INT,
node44 INT,
node45 INT,
node46 INT,
node47 INT,
node48 INT,
node49 INT
)";

if ($conn->query($sql) === TRUE) {
  echo "Table imagesFilesTable created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}


// sql to create table subjectDetailsAndStartTimeTable
$sql = "CREATE TABLE subjectDetailsAndStartTimeTable (
subjectId TEXT,
hour INT,
day INT,
month INT

)";

if ($conn->query($sql) === TRUE) {
  echo "Table imagesFilesTable created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}


// sql to create table learnRandomWalkTable (variable names need changing)
$sql = "CREATE TABLE learnRandomWalkTable (
subjectId TEXT,
run INT,
map INT,
trial INT,
RT INT,
node INT,
picFile TEXT

)";

if ($conn->query($sql) === TRUE) {
  echo "Table learnRandomWalkTable created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}


$conn->close();

?>
