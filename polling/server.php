<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');

//var_dump($_GET);
//$data_recievd = json_encode($_GET);
//echo "data";
//echo $data_recievd;

# get data from file
$content=  file_get_contents("mycv.txt");
echo $content;