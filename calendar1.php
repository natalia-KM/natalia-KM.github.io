<?php

$con = mysqli_connect('localhost', 'root', '','db_calendar');




$sql = "INSERT INTO `monday`(`m1`) VALUES ('$_POST[mo]')";




if (!mysql_query($sql,$con))

  {

  die('Error: ' . mysql_error());

  }

echo "1 record added";

 

mysql_close($con)

?>