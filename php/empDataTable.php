<?php
include(dirname(__DIR__) . '/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$id        = $_POST['id'];
$call      =  $_POST['call'];

$sql;
if ($call == 'onload') {

	$sql = "SELECT  p.id AS stfID, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentID,
				d.id AS depID, d.name AS depName, d.locationID,
				l.id AS locID, l.name AS locName
		FROM personnel p
		INNER JOIN department d ON d.id = p.departmentID
		INNER JOIN location l ON l.id = d.locationID
		ORDER BY lastName
		";
	// WHERE p.id = '$id'
} else if ($call == 'ddmDeptFilter') {
	$sql = "SELECT  p.id AS stfID, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentID,
				d.id AS depID, d.name AS depName, d.locationID,
				l.id AS locID, l.name AS locName
		FROM personnel p
		INNER JOIN department d ON d.id = p.departmentID
		INNER JOIN location l ON l.id = d.locationID
		WHERE d.id = '$id'
		ORDER BY lastName
		";
} else if ($call == 'ddmNameFilter') {
	$sql = "SELECT  p.id AS stfID, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentID,
				d.id AS depID, d.name AS depName, d.locationID,
				l.id AS locID, l.name AS locName
		FROM personnel p
		INNER JOIN department d ON d.id = p.departmentID
		INNER JOIN location l ON l.id = d.locationID
		WHERE p.id = '$id'
		ORDER BY lastName
		";
} else {
	$data['success'] = false;
	$data['message']  = 'error';

	echo json_encode($data, JSON_UNESCAPED_UNICODE);
}

$result = mysqli_query($conn, $sql);

$data 			= [];
$data['data'] 	= [];

if (mysqli_num_rows($result) > 0) {

	while ($row = mysqli_fetch_assoc($result)) {
		array_push($data['data'], $row);
	};
	//array_push($arr, $call);
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
} else {
	$data['success'] = false;
	$data['message']  = 'error';

	echo json_encode($data, JSON_UNESCAPED_UNICODE);
}


mysqli_close($conn);
