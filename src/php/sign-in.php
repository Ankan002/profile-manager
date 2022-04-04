<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    error_reporting(0);

    $host = "bkpdpzksslry44xczn8v-mysql.services.clever-cloud.com";
    $user = "umnwl0grcwal2hzf";
    $password = "cpcbKEXTf4O4W0qHVrZk";
    $dbName = "bkpdpzksslry44xczn8v";
    $port = 3306;

    ($connection = mysqli_connect($host, $user, $password, $dbName, $port)) or
        die(json_encode(["success" => false, "error" => "DB Connection Failed"]));

    $json_data = file_get_contents("php://input");

    $data = json_decode($json_data);

    if($data -> email != null && $data -> password != null){
        $requestingEmail = $data -> email;
        $requestingPassword = $data -> password;

        $sql_query = "SELECT * FROM PROFILE WHERE EMAIL = '$requestingEmail'";

        $response = mysqli_query($connection, $sql_query);

        if(mysqli_num_rows($response) < 1){
            echo(json_encode(["success" => false, "error" => "No user exists"]));
        }
        
        else{
            $response_user_data = mysqli_fetch_assoc($response);

            if(!password_verify($requestingPassword, $response_user_data["PASSWORD"])){
                echo(json_encode(["success" => false, "error" => "Access Denied!!"]));
            }
            else{
                echo(json_encode(["success" => true, "idToken" => $response_user_data["ID"]]));
            }
        }
    }
    else{
        echo(json_encode(["success" => false, "error" => "Bro don't be so dumb please send the required data!!!"]));
    }

    mysqli_close($connection);
?>