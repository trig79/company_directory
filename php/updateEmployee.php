<?php
include(dirname(__DIR__).'/php/dbConnection.php');

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

// $id             = '21';
// $forenames      = 'martin';
// $lastname       = '';
// $jobTitle       = '';
// $email          = '';
// $department     = '';
// $submitValue    = '';

$errors         = array();      // array to hold validation errors
$data           = array();      // array to pass back data
$updates        = array();      // array to hold column data to be updated

if (!empty($forenames))
  $updates[] = 'firstName="'.$forenames.'"';
if (!empty($lastname))
  $updates[] = 'lastName="'.$lastname.'"';
if (!empty($jobTitle))
  $updates[] = 'jobTitle="'.$jobTitle.'"';
if (!empty($email))
  $updates[] = 'email="'.$email.'"';
if (!empty($department))
  $updates[] = 'departmentID="'.$department.'"';
$updates = implode(', ', $updates);

$stmt = $conn->prepare("UPDATE personnel 
                        SET $updates
                        WHERE id = '$id'");
$stmt->execute();


$data['success'] = true;
$data['message'] = 'Success!';

// returns error or success to AJAX call
echo json_encode($data);

mysqli_close($conn);

?>

