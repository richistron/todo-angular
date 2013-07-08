<?php

require 'vendor/autoload.php';

$app = new \Slim\Slim();

$app->config('debug', true);
$app->config('mode', "development");

$app->get('/hello/:name', function ($name) use ($app){
    $dataArray = array('hello' => $name);
	$response = $app->response();
	$response['Content-Type'] = 'application/json';
	$response->body(json_encode($dataArray));
});

$app->run();