<?php
include(dirname(__DIR__).'/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

//values passed from ajax
$id             = $_POST['staffID'];
$submitValue    = $_POST['submitValue'];

$data           = array();      // array to pass back data

if ($submitValue == 'delete') {
    $data['success'] = false;
    $data['value']  = 'reconfirm';
    $data['id']  = $id;
    
} else if ($submitValue == 'submitFinal'){
        
    $stmt = $conn->prepare("DELETE FROM personnel WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $data['success'] = true;
    $data['message'] = 'Success!';
    
    }

echo json_encode($data);

mysqli_close($conn);

?>

