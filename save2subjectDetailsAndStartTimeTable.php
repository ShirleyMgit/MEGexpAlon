<?php
$database="alonbara_meg";
$host="localhost";
$user="alonbara_alon";
$password="Yohghovaih1!";

$db = new mysqli($host, $user, $password, $database);
if (mysqli_connect_errno()) {
   printf("DB error: %s", mysqli_connect_error());
   exit();
}
//for security reasons we remove slashes from the inputs
$Fname = stripslashes(htmlspecialchars($_POST['subjectId']));
$hour = stripslashes(htmlspecialchars($_POST['tc']));
$day= stripslashes(htmlspecialchars($_POST['dc']));
$month= stripslashes(htmlspecialchars($_POST['mc']));

$stmt = $db->prepare("INSERT INTO subjectDetailsAndStartTimeTable (subjectId, hour, day, month) VALUE(?,?,?,?)");// I also insert the hour (note I call it hur - time is a reserved keyword!)
$stmt->bind_param("siii", $Fname,$hour,$day,$month);//s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>
