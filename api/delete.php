<?php
session_start();
if (isset($_SESSION["username"])) {
    $con = mysqli_connect("localhost","heldertheking","__0-(NfkNGPbgqdr","heldertheking");
    if(!(empty($_SESSION["username"]))) {
        $username = mysqli_real_escape_string($con, $_SESSION["username"]);
        $sql = "DELETE FROM accounts WHERE username = '$username';";

        $timeResult = $con->query($sql);
        header('Content-Type: application/json');
        $responseData = array(
            'result' => "success"
        );
        
        echo json_encode($responseData);;
        session_destroy();
    }
} else {
    header('Content-Type: application/json');
    $responseData = array(
        'result' => "not logged in"
    );
    echo json_encode($responseData);;
}