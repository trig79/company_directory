<?php
include(dirname(__DIR__) . '/php/dbConnection.php');

//ini_set('display_errors', 'On');
//error_reporting(E_ALL);

//values passed from ajax
$newDep        = ucwords($_POST['addDepartment']);
$LocID         = $_POST['locID'];
//$newDep        = 'Comms';
//$LocID         = '2';

$data           = array();      // array to pass back data

if (empty($newDep) || ctype_space($newDep) || empty($LocID)) {

    $data['success'] = false;
    $data['message']  = 'EmptyString';
} else {

    $sql = "SELECT * FROM department WHERE name = '$newDep' AND locationID = '$LocID' ";

    $result = mysqli_query($conn, $sql);
    $count  = mysqli_num_rows($result);

    if ($count > 0) {
        //if duplication found return error
        $data['success'] = false;
        $data['message']  = 'duplication';
    } else {
        //if no duplication found insert entry
        $stmt = $conn->prepare("INSERT INTO department (name, locationID) VALUES (?, ?)");
        $stmt->bind_param("ss", $newDep, $LocID);
        $stmt->execute();


        $data['success'] = true;
        $data['message'] = 'Success!';
    }
}

// returns error or success to AJAX call
echo json_encode($data, JSON_UNESCAPED_UNICODE);

mysqli_close($conn);
