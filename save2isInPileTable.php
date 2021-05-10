<?php
// this path should point to your configuration file:
include('dbConnectConfig.php');

$db =  new mysqli($servername, $username, $password,$dbname);
if (mysqli_connect_errno()) {
  printf("DB error: %s", mysqli_connect_error());
  exit();
}
//for security reasons we remove slashes from the inputs
$Fname = stripslashes(htmlspecialchars($_POST['name']));
$Tr = stripslashes(htmlspecialchars($_POST['Trial']));
$m = stripslashes(htmlspecialchars($_POST['map']));
$nR = stripslashes(htmlspecialchars($_POST['nP']));
$isC = stripslashes(htmlspecialchars($_POST['cPile']));
$isinO = stripslashes(htmlspecialchars($_POST['isO']));
$pic11 = stripslashes(htmlspecialchars($_POST['in11']));
$pic12 = stripslashes(htmlspecialchars($_POST['in12']));
$pic13 = stripslashes(htmlspecialchars($_POST['in13']));
$pic21 = stripslashes(htmlspecialchars($_POST['in21']));
$pic22 = stripslashes(htmlspecialchars($_POST['in22']));
$pic23 = stripslashes(htmlspecialchars($_POST['in23']));
$pic4 = stripslashes(htmlspecialchars($_POST['inQ']));
$wPile= stripslashes(htmlspecialchars($_POST['wP']));
$RTp = stripslashes(htmlspecialchars($_POST['RT']));
$totalScore = stripslashes(htmlspecialchars($_POST['totalScore']));

$stmt = $db->prepare("INSERT INTO isInPileTable VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");//I also insert the time
$stmt->bind_param("siiiiiiiiiiiiidi", $Fname,$Tr,$m,$nR,$isC,$isinO,$pic11,$pic12,$pic13,$pic21,$pic22,$pic23,$pic4,$wPile,$RTp,$totalScore);//s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
  'ErrorNo' => $err,
);
$stmt->close();
$db->close();
echo json_encode($data);
?>
