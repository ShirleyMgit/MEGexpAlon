<?php

// this path should point to your configuration file:
include('dbConnectConfig.php');

$db =  new mysqli($servername, $username, $password,$dbname);
if (mysqli_connect_errno()) {
   printf("DB error: %s", mysqli_connect_error());
   exit();
}

$subjectId = stripslashes(htmlspecialchars($_POST['subjectId']));
$trial = stripslashes(htmlspecialchars($_POST['trial']));
$m = stripslashes(htmlspecialchars($_POST['map']));
$pic = stripslashes(htmlspecialchars($_POST['picN']));
$ans = stripslashes(htmlspecialchars($_POST['choice']));
$rt = stripslashes(htmlspecialchars($_POST['rt']));
$cT = stripslashes(htmlspecialchars($_POST['picT']));
$TableN= stripslashes(htmlspecialchars($_POST['tableN']));


$stmt = $db->prepare("INSERT INTO $TableN (subjectId, trial, map, pic, answer, rt, npic) VALUE(?,?,?,?,?,?,?)");//I also insert the time
$stmt->bind_param("siiiiii", $subjectId, $trial,$m,$pic,$ans,$rt,$cT);//s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);

?>
