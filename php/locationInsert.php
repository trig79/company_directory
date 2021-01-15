<?php
include(dirname(__DIR__) . '/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

//values passed from ajax
$newLoc         = ucwords($_POST['addLocation']);

$data           = array();      // array to pass back data

if (empty($newLoc) || ctype_space($newLoc)) {
    $data['success'] = false;
    $data['message']  = 'EmptyString';

    echo json_encode($data, JSON_UNESCAPED_UNICODE);
} else {

    $sql = "SELECT name FROM location 
        WHERE name = '$newLoc' 
        ";

    $result = mysqli_query($conn, $sql);
    $count  = mysqli_num_rows($result);

    if ($count > 0) {
        //if duplication found return error
        $data['success'] = false;
        $data['message']  = 'duplication';
    } else {
        //if no duplication found insert entry
        $stmt = $conn->prepare("INSERT INTO  location (name)
        VALUES (?)");
        $stmt->bind_param("s", $newLoc);
        $stmt->execute();


        $data['success'] = true;
        $data['message'] = 'Success!';
    }
}

// returns error or success to AJAX call
echo json_encode($data, JSON_UNESCAPED_UNICODE);

mysqli_close($conn);
