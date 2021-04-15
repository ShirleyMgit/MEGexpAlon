<?php

// this path should point to your configuration file:
include('newDataBaseConnectMine.php');

$db =  new mysqli($servername, $username, $password,$dbname);
if (mysqli_connect_errno()) {
   printf("DB error: %s", mysqli_connect_error());
   exit();
}

$Fname = stripslashes(htmlspecialchars($_POST['name']));
$Tr = stripslashes(htmlspecialchars($_POST['Trial']));
$m = stripslashes(htmlspecialchars($_POST['map']));
$pic = stripslashes(htmlspecialchars($_POST['picN']));
$ans = stripslashes(htmlspecialchars($_POST['choice']));
$RT = stripslashes(htmlspecialchars($_POST['RTv']));
$cT = stripslashes(htmlspecialchars($_POST['picT']));
$TableN= stripslashes(htmlspecialchars($_POST['tableN']));   


$stmt = $db->prepare("INSERT INTO $TableN VALUE(?,?,?,?,?,?,?)");//I also insert the time
$stmt->bind_param("siiiiii", $Fname, $Tr,$m,$pic,$ans,$RT,$cT);//s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);

?>
