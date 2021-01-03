<?php
include(dirname(__DIR__).'/php/dbConnection.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$id         = $_POST['staffID'];
$fromDate   = $_POST['startDate'];
$endDate    = $_POST['endDate'];

$errors     = array();      // array to hold validation errors
$data       = array();      // array to pass back data
//captures form submission errors
if (empty($fromDate))   $errors['errors']['startDate'] = 'Start Date is missing';
if (empty($endDate))    $errors['errors']['endDate1'] = 'End Date is missing';
if (empty($id))         $errors['errors']['staffID'] = 'Start ID is missing';
//calculates business days of leave taken e.g mon-fri 
$begin = strtotime($fromDate);
$end   = strtotime($endDate);
$no_days  = 0;
if ($begin > $end)      $errors['errors']['endDate2'] = 'End Date must be Equal or Greater than Start Date';

if (!empty($errors)) {
 echo json_encode($errors);
} else {
    while ($begin <= $end) {
    $what_day = date("N", $begin);
    if (!in_array($what_day, [6,7]) ) // 6 and 7 are weekend
    $no_days++;
    $begin += 86400; // +1 day
    };

    $stmt = $conn->prepare("INSERT INTO vacation (staff_id, from_date, to_date, num_weekdays)
                            VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $id, $fromDate, $endDate, $no_days);
    $stmt->execute();

    $data['success'] = true;
    $data['message'] = 'Success!';
    $data['staffID'] = $id;

    echo json_encode($data);

}; 

mysqli_close($conn);

?>

