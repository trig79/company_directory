<?php
include(dirname(__DIR__) . '/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$id = $_POST['id'];

//DB Fetch Data
$sql = "SELECT  p.id AS stfID, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentID,
				d.id AS depID, d.name AS depName, d.locationID,
				l.id AS locID, l.name AS locName
		FROM personnel p
		INNER JOIN department d ON d.id = p.departmentID
		INNER JOIN location l ON l.id = d.locationID 
		WHERE p.id = '$id'";

$result = mysqli_query($conn, $sql);

$arr = [];

if (mysqli_num_rows($result) > 0) {

	while ($row = mysqli_fetch_assoc($result)) {
		array_push($arr, $row);
	};

	$encode = json_encode($arr, JSON_UNESCAPED_UNICODE);
	echo $encode;
} else {
	$temp['error'] = 'No Record Found';
	$encode = json_encode($temp, JSON_UNESCAPED_UNICODE);
	echo $encode;
}

mysqli_close($conn);
