<?php
function isAlphaNumeric($inputString) {
    // Use a regular expression to check if the string only contains a-z and 0-9
    return preg_match('/^[a-z0-9]+$/', $inputString);
}
if (!(empty($_POST["username"])) && !(empty($_POST["password"]))) {
    if(isAlphaNumeric($_POST["username"])) {

    
    $con = mysqli_connect("localhost","heldertheking","__0-(NfkNGPbgqdr","heldertheking");

    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    $username = mysqli_real_escape_string($con, $_POST["username"]);
    $passwd = mysqli_real_escape_string($con, $_POST["password"]);
    $surname = mysqli_real_escape_string($con, $_POST["surname"]);
    $email = mysqli_real_escape_string($con, $_POST["email"]);



    $sql = 'select * from accounts where name="' . $username . '"';
    $result = $con->query($sql);
    if ($result->num_rows == 1) {
        echo "The username is already taken";
        http_response_code(410);
        exit();
    }


    $pwhash = password_hash($passwd, PASSWORD_DEFAULT);
    $sql = "INSERT INTO accounts (name, surname, password, email) VALUES ('".$username."', '".$surname."','".$pwhash."','".$email."');";

    $result = $con->query($sql);


    if ($result === true) {
        echo "The user was created";
        http_response_code(200);
        }

    else {
        echo "An error occured while creating the user.";
        http_response_code(404);
    }

} else {
    echo "cant use abnormal characters";
    http_response_code(469);
}


} else {
    echo "no data";
    http_response_code(418);
}