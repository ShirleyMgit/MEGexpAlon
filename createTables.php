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
node1 TEXT,
node2 TEXT,
node3 TEXT,
node4 TEXT,
node5 TEXT,
node6 TEXT,
node7 TEXT,
node8 TEXT,
node9 TEXT,
node10 TEXT,
node11 TEXT,
node12 TEXT,
node13 TEXT,
node14 TEXT,
node15 TEXT,
node16 TEXT,
node17 TEXT,
node18 TEXT,
node19 TEXT,
node20 TEXT,
node21 TEXT,
node22 TEXT,
node23 TEXT,
node24 TEXT,
node25 TEXT,
node26 TEXT,
node27 TEXT,
node28 TEXT,
node29 TEXT,
node30 TEXT,
node31 TEXT,
node32 TEXT,
node33 TEXT,
node34 TEXT,
node35 TEXT,
node36 TEXT,
node37 TEXT,
node38 TEXT,
node39 TEXT,
node40 TEXT,
node41 TEXT,
node42 TEXT,
node43 TEXT,
node44 TEXT,
node45 TEXT,
node46 TEXT,
node47 TEXT,
node48 TEXT,
node49 TEXT
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
node INT,
imgFile TEXT,
rt FLOAT(5,3) 

)";

if ($conn->query($sql) === TRUE) {
  echo "Table learnRandomWalkTable created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}


$conn->close();

?>