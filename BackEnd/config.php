<?php
class Connect extends PDO 
{
    public function __construct() 
    {
        parent::__construct("mysql:host=localhost;dbname=angular-springboot-project", "root", "password", 
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"));
        $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }
}
?>
