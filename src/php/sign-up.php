<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("access-control-allow-methods: POST");

    error_reporting(0);

    $host = "bkpdpzksslry44xczn8v-mysql.services.clever-cloud.com";
    $user = "umnwl0grcwal2hzf";
    $password = "cpcbKEXTf4O4W0qHVrZk";
    $dbName = "bkpdpzksslry44xczn8v";
    $port = 3306;

    ($connection = mysqli_connect($host, $user, $password, $dbName, $port)) or
        die(json_encode(["success" => false, "error" => "DB Connection Failed"]));

    $request = file_get_contents("php://input");

    $data = json_decode($request);

    $sql_query = "";
    $sql_response;

    if($data -> name != null && $data -> email != null && $data -> password != null){
        $requestingEmail = $data -> email;
        $requestingName = $data -> name;
        $requestingPassword = $data -> password;
        $secured_password = password_hash($requestingPassword, PASSWORD_BCRYPT);
        
        $sql_query = "SELECT * FROM PROFILE WHERE EMAIL='$requestingEmail'";

        $sql_response = mysqli_query($connection, $sql_query) or die(json_encode(["success" => false, "error" => "DB Request Error"]));

        if(mysqli_num_rows($sql_response) > 0){
            echo(json_encode(["success" => false, "error" => "An User with the same email already exists"]));
        }
        else{
            $sql_query = "INSERT INTO PROFILE(EMAIL, NAME, PASSWORD) VALUES('$requestingEmail', '$requestingName', '$secured_password')";

            mysqli_query($connection, $sql_query);

            $registration_id = mysqli_insert_id($connection);

            echo(json_encode(["success" => true, "idToken" => $registration_id]));
        }
    }
    else{
        echo(json_encode(["success" => false, "error" => "Insufficient Data"]));
    }

    mysqli_close($connection);
?>
