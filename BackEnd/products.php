<?php
require_once __DIR__ . '/config.php';

class API{
    function viewProducts(){
        $db = new Connect;
        $products = array();
        $data = $db->prepare('SELECT * FROM products');
        $data->execute();
        $i=0;

        while($OutputData=$data->fetch(PDO::FETCH_ASSOC))
        {
            $products[$i]=array(
                'image'=>$OutputData['image'],
                'Title' =>$OutputData['Title']
            );
            $i++;
        }
        return json_encode($products);
    }
}

$API = new API();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo $API->viewProducts();


//SELECT * FROM category cat LEFT JOIN products prod ON cat.category_id=prod.category_id;