<?php
include(dirname(__DIR__).'/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$id         = $_POST['staffID'];
//$id         = '95';

$errors     = array();      // array to hold validation errors
if (empty($id))  $errors['errors']['staffID'] = 'Error: Staff ID not Recognised';

    $stmt = $conn->prepare("SELECT *
                            FROM vacation
                            WHERE staff_id=?");
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $result = $stmt->get_result(); 
    $data['data'] = $result->fetch_all(MYSQLI_ASSOC); 

    $data['success'] = true;
    $data['message'] = 'Success!';

    echo json_encode($data);

mysqli_close($conn);

?>

