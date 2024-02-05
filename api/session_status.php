<?php

header('Content-Type: application/json');
echo json_encode(array("loggedIn" => !empty($_SESSION["username"])));