<?php
include(dirname(__DIR__).'/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$depID = $_POST['depID'];


//DB Fetch Data
$sql = "SELECT  p.id AS stfID, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentID,
		j.paygrade, j.title
		FROM personnel p
		INNER JOIN jobs j ON j.title = p.jobTitle
		WHERE departmentID = '$depID'
		ORDER BY paygrade DESC";

$result = mysqli_query($conn, $sql); 		

$arr = [];

if (mysqli_num_rows($result) > 0){

	while($row = mysqli_fetch_assoc($result)) {
		array_push($arr, $row);
    };
	$encode = json_encode($arr, JSON_UNESCAPED_UNICODE);
	echo $encode;

} else {
	$temp['error'] = 'error'; 
	$encode = json_encode($temp, JSON_UNESCAPED_UNICODE);
	echo $encode;
}

mysqli_close($conn);

?>
