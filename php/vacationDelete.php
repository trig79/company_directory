<?php
include(dirname(__DIR__).'/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

//values passed from ajax
$reference              = $_POST['reference'];
$staffID                = $_POST['staffID'];

$data = array();      // array to pass back data

    $stmt = $conn->prepare("DELETE FROM vacation WHERE id = ?");
    $stmt->bind_param("s", $reference);
    $stmt->execute();

    $data['success'] = true;
    $data['message'] = 'Success!';
    $data['staffID'] = $staffID;
   

echo json_encode($data);

mysqli_close($conn);

?>

