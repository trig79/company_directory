<?php
include(dirname(__DIR__) . '/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$ref 		= $_POST['reference'];
$searchCall = $_POST['searchCall'];


//DB Fetch Data
if ($searchCall = 'singleSearch' || $searchCall == "depSearch") {
	$sql = "SELECT  p.id AS stfID, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentID,
		j.paygrade, j.title
		FROM personnel p
		INNER JOIN jobs j ON j.title = p.jobTitle
		WHERE departmentID = '$ref'
		ORDER BY paygrade DESC";

	$result = mysqli_query($conn, $sql);
} else {
	$sql = "SELECT  p.id AS stfID, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentID,
	j.paygrade, j.title,
	l.name
	FROM companydirectory.personnel p
	INNER JOIN jobs j ON j.title = p.jobTitle
	INNER JOIN department d ON d.id = p.departmentID
	INNER JOIN location l ON l.id = d.locationID
	WHERE locationID = '$ref'
	ORDER BY paygrade DESC";

	$result = mysqli_query($conn, $sql);
}
$arr = [];

if (mysqli_num_rows($result) > 0) {

	while ($row = mysqli_fetch_assoc($result)) {
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
