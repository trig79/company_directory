<?php
include(dirname(__DIR__) . '/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

//values passed from ajax
$id             = $_POST['staffID'];
$forenames      = $_POST['forenames'];
$lastname       = $_POST['surname'];
$jobTitle       = $_POST['jobTitle'];
$email          = $_POST['email'];
$department     = $_POST['depId'];
$submitValue    = $_POST['submitValue'];

//$errors         = array();      // array to hold validation errors
$data           = array();      // array to pass back data
$updates        = array();      // array to hold column data to be updated

//Checks for existing record on DB
$stmt = $conn->prepare("SELECT * FROM personnel WHERE id = ? ");
$stmt->bind_param("s", $id);
$stmt->execute();
$result = $stmt->get_result();
$data['data'] = $result->fetch_all(MYSQLI_ASSOC);

//Checks if data is unchanged, if true error sent back to user otherwise table updated
if (
  $data['data'][0]['firstName'] == $forenames &&
  $data['data'][0]['lastName'] == $lastname &&
  $data['data'][0]['jobTitle'] == $jobTitle &&
  $data['data'][0]['email'] == $email &&
  $data['data'][0]['departmentID'] == $department
) {
  $data['success'] = false;
  $data['message'] = 'duplication';

  echo json_encode($data);
} else {

  $stmt = $conn->prepare("UPDATE  personnel 
  SET  firstName = ?, lastName = ?, jobTitle = ?, email = ?, departmentID = ?
  WHERE id = $id");
  $stmt->bind_param("sssss", $forenames, $lastname, $jobTitle, $email, $department);
  $stmt->execute();

  $data['success'] = true;
  $data['message'] = 'success';

  echo json_encode($data);
}

mysqli_close($conn);
