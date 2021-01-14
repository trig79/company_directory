<?php
include(dirname(__DIR__) . '/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

//values passed from ajax
$firstname      = $_POST['firstName'];
$lastname       = $_POST['lastName'];
$jobTitle       = $_POST['jobTitle'];
$email          = $_POST['email'];
$department     = $_POST['depID'];

$data           = array();      // array to pass back data

// Nested IF Statement 

$sql = "SELECT * FROM personnel 
        WHERE firstName = '$firstname' 
        AND lastName = '$lastname'
        AND jobTitle = '$jobTitle'
        AND email = '$email'
        AND departmentID = '$department'
        ";

$result = mysqli_query($conn, $sql);
$count  = mysqli_num_rows($result);

if ($count > 0) {
    //if duplication found return error
    $data['success'] = false;
    $data['message']  = 'duplication';
} else {
    //if no duplication found insert entry
    $stmt = $conn->prepare("INSERT INTO  personnel (firstName, lastName, jobTitle, email, departmentID)
        VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $firstname, $lastname, $jobTitle, $email, $department);
    $stmt->execute();


    $data['success'] = true;
    $data['message'] = 'Success!';
}



// returns error or success to AJAX call
echo json_encode($data, JSON_UNESCAPED_UNICODE);

mysqli_close($conn);
