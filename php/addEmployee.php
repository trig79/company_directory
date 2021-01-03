<?php
include(dirname(__DIR__).'/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

//values passed from ajax
$forenames      = $_POST['forenames'];
$lastname       = $_POST['surname'];
$jobTitle       = $_POST['jobTitle'];
$email          = $_POST['email'];
$department     = $_POST['depId'];
$submitValue    = $_POST['submitValue'];

$errors         = array();      // array to hold validation errors
$data           = array();      // array to pass back data

// if any of these variables don't exist, add an error to our $errors array

if (empty($_POST['forenames']))
    $errors['forenames'] = 'Forename is required.';

if (empty($_POST['surname']))
    $errors['surname'] = 'Surname is required.';

if (empty($_POST['jobTitle']) || $jobTitle == 'dropdown_start')
    $errors['jobTitle'] = 'Job Title needs to be selected.';

if (empty($_POST['depId']) || $department == 'dropdown_start')
    $errors['department'] = 'Department needs to be selected.';

if (empty($_POST['email']))
    $errors['email'] = 'Email is required.';

// if there are items in our errors array, return those errors. If okay update DB.
if ( ! empty($errors)) {
    $data['success'] = false;
    $data['errors']  = $errors;
} else if ($submitValue == 'submit'){

        $sql = "SELECT * FROM personnel 
                WHERE firstName = '$forenames' 
                AND lastName = '$lastname'
                AND jobTitle = '$jobTitle'
                AND email = '$email'
                AND departmentID = '$department'
        ";
        
        $result = mysqli_query($conn, $sql); 
        $count  = mysqli_num_rows($result);
        
        if($count > 0 ) {
                $data['success'] = false;
                $data['errors']  = 'duplication';
        } else {
        
        $stmt = $conn->prepare("INSERT INTO  personnel (firstName, lastName, jobTitle, email, departmentID)
        VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $forenames , $lastname, $jobTitle, $email, $department);
        $stmt->execute();


        $data['success'] = true;
        $data['message'] = 'Success!';
        
        }

} else if ($submitValue == 'submitFinal') {
        $stmt = $conn->prepare("INSERT INTO  personnel (firstName, lastName, jobTitle, email, departmentID)
        VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $forenames , $lastname, $jobTitle, $email, $department);
        $stmt->execute();


        $data['success'] = true;
        $data['message'] = 'Success!';
       


}

// returns error or success to AJAX call
echo json_encode($data);

mysqli_close($conn);

?>

