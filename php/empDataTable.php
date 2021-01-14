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


// //DB Fetch Data Names
// $sql = "  SELECT * FROM `personnel` ORDER BY `lastName`	";
// $result = mysqli_query($conn, $sql); 		

// $arr = [];
// $arr['personnel'] = [];
// if (mysqli_num_rows($result) > 0){

// 	while($row = mysqli_fetch_assoc($result)) {
// 		$temp = [];
// 		$temp['firstName'] = $row['firstName'];
// 		$temp['lastName'] = $row['lastName'];
// 		$temp['id'] = $row['id'];
// 		$temp['depID'] = $row['departmentID'];
// 		$temp['email'] = $row['email'];
// 		array_push($arr['personnel'], $temp);
//     };

// } else {
// 	errors();
// }

// //DB Fetch Data Locations
// $sql = "  SELECT * FROM `location` ORDER BY `name`	";
// $result = mysqli_query($conn, $sql); 		

// $arr['locations'] = [];
// if (mysqli_num_rows($result) > 0){

// 	while($row = mysqli_fetch_assoc($result)) {
// 		$temp = [];
// 		$temp['location'] = $row['name'];
// 		$temp['locID'] = $row['id'];
// 		array_push($arr['locations'], $temp);
//     };

// } else {
// 	errors();
// }

// //DB Fetch Data Departments
// $sql = "  SELECT * FROM `department` ORDER BY `name`	";
// $result = mysqli_query($conn, $sql); 		

// $arr['departments'] = [];
// if (mysqli_num_rows($result) > 0){

// 	while($row = mysqli_fetch_assoc($result)) {
// 		$temp = [];
// 		$temp['department'] = $row['name'];
// 		$temp['locID'] = $row['locationID'];
// 		$temp['depID'] = $row['id'];
// 		array_push($arr['departments'], $temp);
//     };

// } else {
// 	errors();
// }

// //DB Fetch Data Jobs
// $sql = "  SELECT * FROM `jobs` ORDER BY `paygrade`	";
// $result = mysqli_query($conn, $sql); 		

// $arr['jobs'] = [];
// if (mysqli_num_rows($result) > 0){

// 	while($row = mysqli_fetch_assoc($result)) {
// 		$temp = [];
// 		$temp['title'] = $row['title'];
// 		$temp['paygrade'] = $row['paygrade'];
// 		array_push($arr['jobs'], $temp);
//     };

// } else {
// 	errors();
// }






//$encode = json_encode($arr, JSON_UNESCAPED_UNICODE);
//echo $encode;

mysqli_close($conn);
