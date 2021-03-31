<?php
$database="smark";
$host="193.62.66.60";
$user="smark";
$password="djh7ArGu3IWgKznH";

$db = new mysqli($host, $user, $password, $database);
if (mysqli_connect_errno()) {
   printf("DB error: %s", mysqli_connect_error());
   exit();
}
//for security reasons we remove slashes from the inputs
$Fname = stripslashes(htmlspecialchars($_POST['Fname']));
$Tr = stripslashes(htmlspecialchars($_POST['Trial']));
$time = stripslashes(htmlspecialchars($_POST['tc']));
$day= stripslashes(htmlspecialchars($_POST['dc']));
$month= stripslashes(htmlspecialchars($_POST['mc']));
$coins = stripslashes(htmlspecialchars($_POST['con']));

$stmt = $db->prepare("INSERT INTO coverTime VALUE(?,?,?,?,?,?)");//I also insert the time
$stmt->bind_param("siiiii", $Fname,$Tr,$time,$day,$month,$coins);//s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>
