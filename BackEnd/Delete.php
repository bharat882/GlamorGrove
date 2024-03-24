<?php
require_once __DIR__ . '/config.php';

class API{
    function deleteUser(){

        $data = json_decode(file_get_contents('php://input'), true);
        $userId = $_GET['userId'];
        $db = new Connect;
        $data = $db->prepare('DELETE cust, cred 
                     FROM customer cust 
                     LEFT JOIN credentials cred ON cust.userId = cred.userId 
                     WHERE cust.userId = :userId');

        $data->bindParam(':userId',$userId,PDO::PARAM_STR);
        
        $response = $data->execute();

        return json_encode($response);
      
    }
}

$API = new API();
header('Content-Type:application/json');
header('Access-Control-Allow_Origin:*');
echo $API -> deleteUser();

?>

/// 