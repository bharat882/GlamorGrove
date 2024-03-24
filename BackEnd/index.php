<?php
require_once __DIR__ . '/config.php';

class API {
    function Select() {
        $db = new Connect;
        $users = array();
        $data = $db->prepare('SELECT * FROM credentials');
        $data->execute();
        $i = 0;
        while ($OutputData = $data->fetch(PDO::FETCH_ASSOC)) {
            $users[$i] = array(
                'username' => $OutputData['UserName'],
                'password' => $OutputData['Password'],
                'userId' => $OutputData['userId'],
                'recordId' => $OutputData['RecordId'],
            );
            $i++;
        }
        return json_encode($users);
    }
}

$API = new API();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo $API->Select();
?>
