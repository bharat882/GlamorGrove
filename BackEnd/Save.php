<?php
require_once __DIR__ . '/config.php';

class API{
    function saveRecord(){

        $data = json_decode(file_get_contents('php://input'),true);
        $username = $_GET['username'];
        $password = $_GET['password'];
        $recordId = $_GET['recordId'];

        $db= new Connect;
        

        $data = $db -> prepare("Update credentials SET UserName= :username, Password = :password WHERE RecordId = :recordId") ;
        $data-> bindParam(':username',$username);
        $data->bindParam(':password',$password);
        $data->bindParam('recordId',$recordId);
        $response = $data->execute();

        return json_encode($response);        

    }
}

$API = new API();

header('Content-Type:application/json');
header('Access-Control-Allow-Origin:*');
echo $API -> saveRecord();

?>
