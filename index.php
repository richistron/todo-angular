<?php

require 'vendor/autoload.php';

// http://docs.slimframework.com/ 
$app = new \Slim\Slim();

$app->config('debug', false);
$app->config('log.enable',true);
$app->config('mode', "production");

$app->config('templates.path', "./tpl");

$appVersion =  md5("v2.3.1");

// main page
$app->get('/', function () use ($app,$appVersion){
	 $app->etag($appVersion);
	$app->render("front.php");
});

// json services
$app->get('/json/:json', function ($json) use ($app,$appVersion){
	if($json == "feeds"){
		$app->etag($appVersion);
		$app->render( $json . ".php");
	}else{
		$app->notFound();
	}	
});

$app->run();