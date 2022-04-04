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

    if($data -> userId == null){
        echo(json_encode(["success" => false, "error" => "Bro don't be so dumb please send the userId!!!"]));
    }
    else{
        $userId = $data -> userId;

        $sql_query = "SELECT * FROM PROFILE WHERE ID = '$userId'";

        $response = mysqli_query($connection, $sql_query) or die(json_encode(["success" => false, "error" => "DB Request Error"]));

        if(mysqli_num_rows($response) < 1){
            echo(json_encode(["success" => false, "error" => "No user exists"]));
        }
        
        else{
            $database_user_found = mysqli_fetch_assoc($response);

            echo(json_encode(["success" => true, "name" => $database_user_found["NAME"], "email" => $database_user_found["EMAIL"]]));
        }
    }

    mysqli_close($connection);
?>