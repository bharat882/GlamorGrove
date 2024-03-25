<?php
require_once __DIR__ . '/config.php';

class API{
    function ViewCustomerRecord(){
        $userId = (int)$_GET['id']+1;
        
        $db = new Connect;
        $customerRecord =" ";
        $loopExecuted = false;

      //  $userId = 1;
        // TO DO : Get userId as input somehow
        $data = $db -> prepare('SELECT * FROM customer where userId = :userId');
        $data->bindParam(':userId',$userId,PDO::PARAM_INT);
        $data->execute();
        while($OutputData = $data -> fetch(PDO::FETCH_ASSOC))
        {
            $loopExecuted = true;
            $customerRecord = array(
                 'UserId' => $OutputData['userId'],
                 'FirstName' => $OutputData['fname'],
                 'LastName' => $OutputData['lname'],
                 'tel' => $OutputData['tel'],
                 'address' => $OutputData['address'],
                 'state' => $OutputData['state'],
                 'city' => $OutputData['city'],
                 'zip' => $OutputData['zip'],
            );
        }

        if ($loopExecuted) {
            return json_encode($customerRecord);
        } else {
            // Handle the case where the loop did not run (no records found)
            return json_encode(array('error' => 'No records found'));
        }
        
        return json_encode($customerRecord);
    }
}

$API = new API();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo $API -> ViewCustomerRecord();


?>