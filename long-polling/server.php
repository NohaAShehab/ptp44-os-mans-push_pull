<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');

//var_dump($_GET);
$data_recievd = json_encode($_GET);
//echo "data";
//echo $data_recievd;


$client_time = $_GET['lastModified'];
# track changes on server
$file_time = filemtime('mycv.txt');
//
//var_dump($file_time);
//exit ;

//var_dump($file_time, $client_time);

//if ($file_time > $client_time) {
//    $content=  file_get_contents("mycv.txt");
//    $data_to_send = ['servertime'=>$file_time,
//        'data'=>$content];
//    echo json_encode($data_to_send);
//}

### check server time every 1 second

while ($client_time >= $file_time) {
    sleep(1);
    clearstatcache();
    $file_time =filemtime('mycv.txt');

}


$file_content = file_get_contents('mycv.txt');
$message = [
    'data'=>$file_content,
    'client_time'=>$client_time,
    'server_time'=>$file_time
];

echo json_encode($message);
//# get data from file;
//$content=  file_get_contents("mycv.txt");
//echo $content;