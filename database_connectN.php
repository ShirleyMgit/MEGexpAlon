<?php
include('dbConnectConfig.php');

//this script sends number to sql table one by one
$dbc = mysql_connect($servername, $username, $password);
// $dbc = mysql_connect('193.62.66.60', 'smark', 'djh7ArGu3IWgKznH');
mysql_select_db('alonbara', $dbc);

?>
