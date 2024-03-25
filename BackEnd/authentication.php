<?php
require_once __DIR__ . '/config.php';

class API{
    function authenticateUser(){

        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'];
        $password = $data['password'];

        $db = new Connect;
        $data = $db -> prepare ('SELECT credentials.UserName, user_type , credentials.recordId FROM customer INNER JOIN credentials ON credentials.userId = customer.userId where UserName = :username AND Password = :password;');
        $data->bindParam('username',$username,PDO::PARAM_STR);
        $data->bindParam('password',$password,PDO::PARAM_STR);
        $data->execute();
        $response = $data -> fetch(PDO::FETCH_ASSOC);

        return json_encode($response);
      
    }
}

$API = new API();
header('Content-Type:application/json');
header('Access-Control-Allow_Origin:*');
echo $API -> authenticateUser();

?>