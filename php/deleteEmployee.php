<?php
include(dirname(__DIR__) . '/php/dbConnection.php');

// ini_set('display_errors', 'On');
// error_reporting(E_ALL);

$id             = $_POST['stfID'];

$data           = [];      // array to pass back data
$errors         = [];      // array to hold validation errors

if (empty($id))
    $errors['staff ID'] = 'Staff ID not Received.';

if (!empty($errors)) {
    $data['success'] = false;
    $data['message']  = $errors;
} else {

    $stmt = $conn->prepare("DELETE FROM `personnel` WHERE `id` = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $rowCount = $stmt->affected_rows;

    if ($rowCount > 0) {
        $data['success'] = true;
        $data['message'] = 'Success!';
    } else {
        $data['success'] = false;
        $data['message'] = 'Nothing was deleted!';
    };
};

echo json_encode($data, JSON_UNESCAPED_UNICODE);
mysqli_close($conn);
