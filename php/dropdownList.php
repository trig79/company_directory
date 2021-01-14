<?php
include(dirname(__DIR__) . '/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$data					= [];      // array to pass back data

//DB Fetch Data Departments
$sql = " SELECT * FROM `department` ORDER BY `name` ";
$result = mysqli_query($conn, $sql);

$data['departments']    = [];      // array to pass back data
if (mysqli_num_rows($result) > 0) {

	while ($row = mysqli_fetch_assoc($result)) {
		$temp = [];
		$temp['department'] = $row['name'];
		$temp['locID'] = $row['locationID'];
		$temp['depID'] = $row['id'];
		array_push($data['departments'], $temp);
	};
} else {
	$data['departments']['success'] = false;
	$data['departments']['message'] = 'Nothing Retrieved from DB';
}


//DB Fetch Data Locations
$sql = "  SELECT * FROM `location` ORDER BY `name`	";
$result = mysqli_query($conn, $sql);

$data['locations']    = [];      // array to pass back data
if (mysqli_num_rows($result) > 0) {

	while ($row = mysqli_fetch_assoc($result)) {
		$temp = [];
		$temp['location'] = $row['name'];
		$temp['locID'] = $row['id'];
		array_push($data['locations'], $temp);
	};
} else {
	$data['locations']['success'] = false;
	$data['locations']['message'] = 'Nothing Retrieved from DB';
}

//DB Fetch Data Names
$sql = "  SELECT * FROM `personnel` ORDER BY `lastName`	";
$result = mysqli_query($conn, $sql);

$data['personnel'] = [];
if (mysqli_num_rows($result) > 0) {

	while ($row = mysqli_fetch_assoc($result)) {
		$temp = [];
		$temp['firstName'] = $row['firstName'];
		$temp['lastName'] = $row['lastName'];
		$temp['id'] = $row['id'];
		$temp['depID'] = $row['departmentID'];
		array_push($data['personnel'], $temp);
	};
} else {
	$data['personnel']['success'] = false;
	$data['personnel']['message'] = 'Nothing Retrieved from DB';
}

$encode = json_encode($data, JSON_UNESCAPED_UNICODE);
echo $encode;

mysqli_close($conn);
