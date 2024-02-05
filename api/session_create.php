<?php
session_start();
if (isset($_POST["username"]) && isset($_POST["password"])) {
    $con = mysqli_connect("localhost","heldertheking","__0-(NfkNGPbgqdr","heldertheking");

    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    $username = mysqli_real_escape_string($con, $_POST["username"]);
    $passwd = mysqli_real_escape_string($con, $_POST["password"]);

    $pwhash = password_hash($passwd, PASSWORD_DEFAULT);
    $sql = 'select * from accounts where username="'. $username .'"';
    


    $result = $con->query($sql);


    if ($result->num_rows == 1) {
        while ($row = $result->fetch_assoc()) {

            
            
                if(password_verify($passwd,$row['password'])) {
                    echo "login success state=";



                    $_SESSION['username'] = $username;
                    echo session_status();
                } else {
                    echo "wrong password";
                    http_response_code(401);
                };
        }

    } else {
        echo "The user does not exist";
        http_response_code(404);
    }




} else {
    echo "no data";
    http_response_code(418);
}