<?php
include(dirname(__DIR__) . '/php/dbConnection.php');

// ini_set('display_errors', 'On');
// error_reporting(E_ALL);

//$depID          = strval($_POST['depID']);
$depID          = $_POST['depID'];

$data           = array();      // array to pass back data

//Nested Statement 
//check for empty POST return error
//looks for staff assign that particular depID returns error if true
//checks if department id exists, if not delete
if (empty($depID)) {

    $data['success'] = false;
    $data['message']  = 'EmptyString';
} else if ($depID) {

    $sql = "SELECT  p.id AS stfID, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentID,
            d.id AS depID, d.name AS depName, d.locationID,
            l.id AS locID, l.name AS locName
            FROM personnel p
            INNER JOIN department d ON d.id = p.departmentID
            INNER JOIN location l ON l.id = d.locationID 
            WHERE d.id = '$depID'";

    $result = mysqli_query($conn, $sql);
    $count  = mysqli_num_rows($result);

    if ($count > 0) {
        //if records exist wth personnel in that location send error
        $data['success'] = false;
        $data['message']  = 'PlaceInUse';
        $data['personnelAssigned']  = $count;
    } else {

        $sql = "SELECT * FROM department WHERE id = '$depID' ";

        $result = mysqli_query($conn, $sql);
        $count  = mysqli_num_rows($result);
        //echo $count;

        if ($count > 0) {
            //if no duplication found insert entry
            $stmt = $conn->prepare("DELETE FROM department WHERE id = ? ");
            $stmt->bind_param("s", $depID);
            $stmt->execute();

            $data['success'] = true;
            $data['message'] = 'DepartmentDeleted';
        } else {

            $data['success'] = false;
            $data['message'] = 'Error';
        }
    }
}


// //Nested Statement > Checks if Location is in use > Checks if Loc on DB
// if (empty($deleteLoc) || empty($deleteDep)) {

//     $data['success'] = false;
//     $data['message']  = 'EmptyString';
// } else if ($deleteLoc && $deleteDep) {

//     $sql = "SELECT  p.id AS stfID, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentID,
//             d.id AS depID, d.name AS depName, d.locationID,
//             l.id AS locID, l.name AS locName
//             FROM personnel p
//             INNER JOIN department d ON d.id = p.departmentID
//             INNER JOIN location l ON l.id = d.locationID 
//             WHERE d.locationID = '$deleteLoc' AND d.name = '$deleteDep' ";

//     $result = mysqli_query($conn, $sql);
//     $count  = mysqli_num_rows($result);

//     if ($count > 0) {
//         //if records exist wth personnel in that location send error
//         $data['success'] = false;
//         $data['message']  = 'PlaceInUse';
//         $data['personnelAssigned']  = $count;
//     } else {

//         $sql = "SELECT * FROM department WHERE locationID = '$deleteLoc' AND name = '$deleteDep' ";

//         $result = mysqli_query($conn, $sql);
//         $count  = mysqli_num_rows($result);
//         echo $count;
//         if ($count > 0) {
//             //if no duplication found insert entry
//             $stmt = $conn->prepare("DELETE FROM department WHERE locationID = ? AND name = ? ");
//             $stmt->bind_param("si", $deleteLoc, $deleteDep);
//             $stmt->execute();

//             $data['success'] = true;
//             $data['message'] = 'DepartmentDeleted';
//         } else {
//             $data['success'] = false;
//             $data['message'] = 'DepLocNoExist';
//         }
//     }
// }

echo json_encode($data, JSON_UNESCAPED_UNICODE);

mysqli_close($conn);
